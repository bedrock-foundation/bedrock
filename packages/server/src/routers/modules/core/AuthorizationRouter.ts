import Joi from 'joi';
import {
  TransactionInstruction,
  PublicKey,
  Transaction,
  Keypair,
} from '@solana/web3.js';
import {
  AuthorizationParams,
  WaitUtil,
  TransactionStatuses,
  createNonceSocketTopic,
  BedrockCore,
  AuthorizationData,
  TokenDataSummary,
} from '@bedrock-foundation/sdk';
import jwt from 'jsonwebtoken';
import express from 'express';
import * as JSURL from '@bedrock-foundation/jsurl';
import { RedisClientType } from 'redis';
import { Server as SocketServer } from 'socket.io';
import RPCConnection from '../../../utils/RPCConnection';
import * as TokenGateUtil from '../../../utils/TokenGateUtil';
import { TransactionRouter, BaseTransactionRouter, TransactionRouterParams } from '../../../models/BaseTransactionRouter';
import {
  CreateTransactionRequest,
  CreateTransactionResponse,
  NonceRequest,
  NonceResponse,
  TransactionRequest,
  TransactionResponse,
  StatusCodes,
  isSuccessfulResponse,
} from '../../../models/shared';
import * as JoiUtil from '../../../utils/JoiUtil';

const tokenGate = Joi.object().keys({
  collectionId: Joi.string().optional(),
  firstCreatorId: Joi.string().optional(),
  updateAuthorityId: Joi.string().optional(),
  traits: Joi.any(),
  discountPercentage: Joi.number().optional(),
});

export const authorizationParmsSchema = Joi.object().keys({
  gate: tokenGate,
  refs: Joi.array().items(Joi.string()).default([]),
});

export const authorizationSchema = Joi.object().keys({
  account: Joi.string().required(),
  params: authorizationParmsSchema,
}).prefs({
  abortEarly: false,
});

export type CreateAuthorizationTransactionRequest = CreateTransactionRequest<AuthorizationParams>;

export type CreateAuthorizationTransactionResponse = CreateTransactionResponse;

export const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

export type AuthorizationRouterParams = TransactionRouterParams & {
  jwtSecret: string;
  redis: RedisClientType;
  io: any;
}

export class AuthorizationRouter extends BaseTransactionRouter implements TransactionRouter<CreateAuthorizationTransactionRequest> {
  public noncePath: string;

  private jwtSecret: string;

  private redis: RedisClientType;

  private io: SocketServer;

  constructor(params: AuthorizationRouterParams) {
    super(params);
    this.path = BedrockCore.Paths.Authorization;
    this.noncePath = BedrockCore.Paths.AuthorizationNonce;
    this.jwtSecret = params.jwtSecret;
    this.router = express.Router();
    this.redis = params.redis;
    this.io = params.io;
    this.router.get(this.path, super.get.bind(this));
    this.router.get(this.noncePath, this.createNonce.bind(this));
    this.router.post(this.path, this.post.bind(this));
  }

  async post(req: TransactionRequest<AuthorizationParams>, res: TransactionResponse): Promise<void> {
    const { account } = req.body;
    const params = JSURL.parse<AuthorizationParams>(req.query.params);

    try {
      const request: CreateAuthorizationTransactionRequest = {
        account,
        params,
      };

      const response = await this.createTransaction(request);

      if (!isSuccessfulResponse(response)) {
        throw new Error(response?.error?.message);
      }

      res.status(response.status).json({
        transaction: response?.txBuffer?.toString('base64') ?? null,
        message: 'Authorize with Bedrock',
      });
    } catch (e: any) {
      this.logger.error(e);
      res.status(StatusCodes.BAD_REQUEST).send({
        transaction: null,
        message: e.message,
      });
    }
  }

  async createNonce(req: NonceRequest<AuthorizationParams>, res: NonceResponse): Promise<void> {
    try {
      const params = JSURL.parse<AuthorizationParams>(req.query.params);

      const ref = params.refs?.[0] ?? '';
      const nonce = new Keypair().publicKey.toBase58();

      this.redis.hSet('nonces', ref, nonce);

      res.status(StatusCodes.OK).json({
        nonce,
      });
    } catch (e: any) {
      this.logger.error(e);
      res.status(StatusCodes.BAD_REQUEST).send({
        nonce: null,
        message: 'Failed to create nonce.',
      });
    }
  }

  validateTransactionRequest(request: CreateAuthorizationTransactionRequest): JoiUtil.JoiValidatorResponse<CreateAuthorizationTransactionRequest> {
    return JoiUtil.validate(
      authorizationSchema,
      request,
    );
  }

  async createTransaction(request: CreateAuthorizationTransactionRequest): Promise<CreateAuthorizationTransactionResponse> {
    const response: CreateAuthorizationTransactionResponse = {
      status: StatusCodes.UNKNOWN_CODE,
    };

    const { value, errors } = this.validateTransactionRequest(
      request,
    );

    const {
      account,
      params,
    }: CreateAuthorizationTransactionRequest = value;

    if (JoiUtil.hasErrors(errors)) {
      const errorMsg = JoiUtil.errorsToMessage(errors);
      this.logger.error(errorMsg);
      response.status = StatusCodes.UNPROCESSABLE_ENTITY;
      response.error = new Error(errorMsg);
      return response;
    }

    const {
      refs,
      gate,
    } = params;

    const ref = refs?.[0] ?? '';
    const nonce: string | undefined = await this.redis.hGet('nonces', ref);

    if (!nonce) {
      const errorMsg = 'Invalid request. Nonce not found.';
      this.logger.error(errorMsg);
      response.status = StatusCodes.BAD_REQUEST;
      response.error = new Error(errorMsg);
      return response;
    }

    /**
      * Apply the access gate if one is specified
      */
    const customerPublicKey = new PublicKey(account);
    const nonceSocketTopic = createNonceSocketTopic(nonce);
    let tokens: TokenDataSummary[];

    try {
      tokens = gate ? await TokenGateUtil.applyAccessGate(gate, customerPublicKey) : [];

      if (gate && tokens.length === 0) {
        /**
         * Broadcast failure to client
         */
        const errorMsg = 'User does not have required NFT.';
        const authorizationData: AuthorizationData = {
          accountId: account,
          status: TransactionStatuses.Error,
          message: 'User does not have required NFT',
          signature: null,
          token: null,
        };

        this.io.emit(nonceSocketTopic, authorizationData);

        /**
         * Response with failure to wallet
         */
        this.logger.error(errorMsg);
        response.status = StatusCodes.UNAUTHORIZED;
        response.error = new Error(errorMsg);
        return response;
      }
    } catch (e: any) {
      const errorMsg = e.message;
      this.logger.error(e);
      response.status = StatusCodes.INTERNAL_SERVER_ERROR;
      response.error = new Error(errorMsg);
      return response;
    }

    /**
     * Broadcast the scan to the client
     */
    const authorizationData: AuthorizationData = {
      accountId: account,
      status: TransactionStatuses.Scanned,
      message: 'User scanned QR code.',
      signature: null,
      token: null,
      gate: tokens[0],
    };

    this.io.emit(nonceSocketTopic, authorizationData);

    /**
     * Create the transaction
     */

    let txBuffer: Buffer;

    const keypair = Keypair.generate();

    try {
      const memoIx = new TransactionInstruction({
        programId: MEMO_PROGRAM_ID,
        keys: [
          {
            pubkey: customerPublicKey,
            isSigner: true,
            isWritable: false,
          },
          {
            pubkey: new PublicKey(keypair.publicKey),
            isSigner: true,
            isWritable: false,
          },

        ],
        data: Buffer.from('BEDROCK_AUTHORIZATION', 'utf8'),
      });
      const tx = new Transaction().add(memoIx);

      tx.feePayer = customerPublicKey;

      tx.recentBlockhash = (
        await RPCConnection.getLatestBlockhash('confirmed')
      ).blockhash;

      /**
       * Here we serialize and deserialize the tx
       * as a workaround for this isue
       * https://github.com/solana-labs/solana/issues/21722
       */
      const orderedTx = Transaction.from(tx.serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      }));

      orderedTx.partialSign(keypair);

      txBuffer = orderedTx.serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      });

      const createJwt = (signature: string, accountId: string) => {
        return jwt.sign(
          {
            signature,
            accountId,
          },
          this.jwtSecret,
        );
      };

      const confirmTransaction = async () => {
        try {
          // try to confirm the transaction up to 30 times
          for (let i = 0; i < 30; i++) {
            try {
              await WaitUtil.wait(2000);
              const signatures = await RPCConnection.getSignaturesForAddress(keypair.publicKey, {}, 'confirmed');
              if (signatures.length > 0) {
                const signature = signatures[0].signature;

                const authorizationData: AuthorizationData = {
                  accountId: account,
                  message: 'User successfully authenticated',
                  status: TransactionStatuses.Confirmed,
                  signature,
                  token: createJwt(signature, account),
                  gate: tokens[0],
                };

                this.io.emit(nonceSocketTopic, authorizationData);
                break;
              }
            } catch (e) {
              this.logger.log(e);
              this.logger.log(`Failed to confirm tranaction with ref ${ref}`);
            }
          }
        } catch (e) {
          this.logger.error('Failed to confirm transaction');
          this.logger.error(e);
        }
      };

      confirmTransaction();
    } catch (e: any) {
      const errorMsg = e.message;
      this.logger.error(e);
      response.status = StatusCodes.INTERNAL_SERVER_ERROR;
      response.error = new Error(errorMsg);
      return response;
    }

    response.status = StatusCodes.OK;
    response.txBuffer = txBuffer;
    return response;
  }
}
