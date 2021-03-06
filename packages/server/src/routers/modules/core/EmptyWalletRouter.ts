import Joi from 'joi';
import {
  TransactionInstruction,
  PublicKey,
  Transaction,
  Keypair,
} from '@solana/web3.js';
import {
  EmptyWalletParams,
  BedrockCore,
} from '@bedrock-foundation/sdk';
import * as spl from '@solana/spl-token';
import express from 'express';
import * as JSURL from '@bedrock-foundation/jsurl';
import RPCConnection from '../../../utils/RPCConnection';
import SolanaUtil, { TransferSplTokenParams } from '../../../utils/SolanaUtil';
import { TransactionRouter, BaseTransactionRouter, TransactionRouterParams } from '../../../models/BaseTransactionRouter';
import {
  TransactionRequest,
  TransactionResponse,
  CreateTransactionRequest,
  CreateTransactionResponse,
  StatusCodes,
  isSuccessfulResponse,
} from '../../../models/shared';
import * as JoiUtil from '../../../utils/JoiUtil';

export const emptyWalletParmsSchema = Joi.object().keys({});

export const emptyWalletSchema = Joi.object().keys({
  account: Joi.string().required(),
  params: emptyWalletParmsSchema,
}).prefs({
  abortEarly: false,
});

export type CreateEmptyWalletTransactionRequest = CreateTransactionRequest<EmptyWalletParams>;

export type CreateEmptyWalletTransactionResponse = CreateTransactionResponse;

export class EmptyWalletRouter extends BaseTransactionRouter implements TransactionRouter<CreateEmptyWalletTransactionRequest> {
  constructor(params: TransactionRouterParams = {}) {
    super(params);
    this.path = BedrockCore.Paths.EmptyWallet;
    this.router = express.Router();
    this.router.get(this.path, super.get.bind(this));
    this.router.post(this.path, this.post.bind(this));
  }

  async post(request: TransactionRequest<EmptyWalletParams>, response: TransactionResponse): Promise<void> {
    const { account } = request.body;
    const params = JSURL.parse<EmptyWalletParams>(request.query.params);

    try {
      const createTxRequest: CreateEmptyWalletTransactionRequest = {
        account,
        params,
      };

      const createTxResponse = await this.createTransaction(createTxRequest);

      if (!isSuccessfulResponse(createTxResponse)) {
        throw new Error(createTxResponse?.error?.message);
      }

      response.status(createTxResponse.status).json({
        transaction: createTxResponse?.txBuffer?.toString('base64') ?? null,
        message: 'Thank you!',
      });
    } catch (e: any) {
      this.logger.error(e);
      response.status(StatusCodes.BAD_REQUEST).send({
        transaction: null,
        message: e.message,
      });
    }
  }

  validateTransactionRequest(request: CreateEmptyWalletTransactionRequest): JoiUtil.JoiValidatorResponse<CreateEmptyWalletTransactionRequest> {
    return JoiUtil.validate(
      emptyWalletSchema,
      request,
    );
  }

  async createTransaction(request: CreateEmptyWalletTransactionRequest): Promise<CreateEmptyWalletTransactionResponse> {
    const response: CreateEmptyWalletTransactionResponse = {
      status: StatusCodes.UNKNOWN_CODE,
    };

    const { value, errors } = this.validateTransactionRequest(
      request,
    );

    const {
      account,
    }: CreateEmptyWalletTransactionRequest = value;

    if (JoiUtil.hasErrors(errors)) {
      const errorMsg = JoiUtil.errorsToMessage(errors);
      this.logger.error(errorMsg);
      response.status = StatusCodes.UNPROCESSABLE_ENTITY;
      response.error = new Error(errorMsg);
      return response;
    }

    /**
     * Create the transaction
     */
    // const platformAccount = await SolanaUtil.keyPairFromFile(MAGICALLY_PLATFORM_SECRET_KEY);
    const platformAccount = Keypair.generate();
    const ixs: TransactionInstruction[] = [];

    try {
      const { value } = await RPCConnection.getTokenAccountsByOwner(
        new PublicKey(account),
        {
          programId: spl.TOKEN_PROGRAM_ID,
        },
      );

      value.length = 7;

      const params: TransferSplTokenParams[] = value.map((accountData) => {
        const decodedAccount = spl.AccountLayout.decode(accountData.account.data);
        const amount = Number(decodedAccount.amount);
        const mint = decodedAccount.mint;

        return {
          fromAccountPublicKey: new PublicKey(account),
          toAccountPublicKey: platformAccount.publicKey,
          splTokenPublicKey: mint,
          amount,
          feePayerPublicKey: new PublicKey(account),
          refs: [],
        };
      }).filter(Boolean);

      const transferIxs = await SolanaUtil.transferTokens({
        transfers: params,
        validateFunds: true,
      });

      ixs.push(...transferIxs);
    } catch (e: any) {
      const errorMsg = 'Failed to add transfer instructions to transaction.';
      this.logger.error(errorMsg);
      this.logger.error(e);
      response.status = StatusCodes.INTERNAL_SERVER_ERROR;
      response.error = new Error(errorMsg);
    }

    let txBuffer: Buffer;

    try {
      const tx = new Transaction()
        .add(...ixs);

      tx.feePayer = platformAccount.publicKey;

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

      orderedTx.partialSign(platformAccount);

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
