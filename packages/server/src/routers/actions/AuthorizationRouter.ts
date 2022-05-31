import {
  TransactionInstruction,
  PublicKey,
  Transaction,
  Keypair,
} from '@solana/web3.js';
import {
  AuthorizationAction,
  AuthorizationParams,
  CreateAuthorizationTransactionRequest,
  CreateAuthorizationTransactionResponse,
  JoiUtil,
  ErrorUtil,
  StatusCodes,
} from '@bedrock-foundation/sdk';
import express from 'express';
import * as JSURL from '@bedrock-foundation/jsurl';
import { RedisClientType } from 'redis';
import RPCConnection from '../../utils/RPCConnection';
import { ActionRouter, BaseActionRouter, ActionRouterParams } from '../../models/BaseActionRouter';
import {
  NonceRequest, NonceResponse, TransactionRequest, TransactionResponse,
} from '../../models/shared';

const authorization = new AuthorizationAction();

type AuthorizationRouterParams = ActionRouterParams & {
  redis: RedisClientType;
  io: any;
}

export const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

export class AuthorizationRouter extends BaseActionRouter implements ActionRouter<CreateAuthorizationTransactionRequest> {
  private redis: RedisClientType;

  private io: any;

  public noncePath: string;

  constructor(params: AuthorizationRouterParams) {
    super(params);
    this.path = authorization.path;
    this.noncePath = authorization.noncePath;
    this.router = express.Router();
    this.redis = params.redis;
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

      if (!ErrorUtil.isSuccessfulResponse(response)) {
        throw new Error(response?.error?.message);
      }

      res.status(response.status).json({
        transaction: response?.txBuffer?.toString('base64') ?? null,
        message: 'Thank you!',
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

  async createTransaction(request: CreateAuthorizationTransactionRequest): Promise<CreateAuthorizationTransactionResponse> {
    const response: CreateAuthorizationTransactionResponse = {
      status: StatusCodes.UNKNOWN_CODE,
    };

    const { value, errors } = authorization.validateDelivery(
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
     * Create the transaction
     */
    const customerPublicKey = new PublicKey(account);

    let txBuffer: Buffer;

    try {
      const memoIx = new TransactionInstruction({
        programId: MEMO_PROGRAM_ID,
        keys: [
          {
            pubkey: customerPublicKey,
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

      txBuffer = orderedTx.serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      });
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
