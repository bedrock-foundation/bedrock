import Joi from 'joi';
import {
  TransactionInstruction,
  LAMPORTS_PER_SOL,
  SystemProgram,
  PublicKey,
  Transaction,
} from '@solana/web3.js';
import {
  TransferParams,
  TokenTypes,
  TokenInfo,
  TokenDataSummary,
  BedrockCore,
} from '@bedrock-foundation/sdk';
import express from 'express';
import * as JSURL from '@bedrock-foundation/jsurl';
import * as TokenGateUtil from '../../../utils/TokenGateUtil';
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

const tokenGate = Joi.object().keys({
  collection: Joi.string().optional(),
  traits: Joi.any(),
  discountPercentage: Joi.number().optional(),
});

export const transferParamsSchema = Joi.object().keys({
  wallet: Joi.string().required(),
  token: Joi.string().required(),
  quantity: Joi.number().optional(),
  gate: tokenGate,
  size: Joi.number().optional(),
  icon: Joi.string().optional(),
  label: Joi.string().optional(),
  refs: Joi.array().items(Joi.string()).default([]),
});

export const transferSchema = Joi.object().keys({
  account: Joi.string().required(),
  params: transferParamsSchema,
}).prefs({
  abortEarly: false,
});

export type CreateTransferTransactionRequest = CreateTransactionRequest<TransferParams>;

export type CreateTransferTransactionResponse = CreateTransactionResponse;

export class TransferRouter extends BaseTransactionRouter implements TransactionRouter<CreateTransferTransactionRequest> {
  constructor(params: TransactionRouterParams = {}) {
    super(params);
    this.path = BedrockCore.Paths.Transfer;
    this.router = express.Router();
    this.router.get(this.path, super.get.bind(this));
    this.router.post(this.path, this.post.bind(this));
  }

  async post(req: TransactionRequest<TransferParams>, res: TransactionResponse): Promise<void> {
    const { account } = req.body;
    const params = JSURL.parse<TransferParams>(req.query.params);

    try {
      const request: CreateTransferTransactionRequest = {
        account,
        params,
      };

      const response = await this.createTransaction(request);

      if (!isSuccessfulResponse(response)) {
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

  validateTransactionRequest(request: CreateTransferTransactionRequest): JoiUtil.JoiValidatorResponse<CreateTransferTransactionRequest> {
    return JoiUtil.validate(
      transferSchema,
      request,
    );
  }

  async createTransaction(request: CreateTransferTransactionRequest): Promise<CreateTransferTransactionResponse> {
    const response: CreateTransferTransactionResponse = {
      status: StatusCodes.UNKNOWN_CODE,
    };

    const { value, errors } = this.validateTransactionRequest(request);

    const {
      account,
      params,
    }: CreateTransferTransactionRequest = value;

    if (JoiUtil.hasErrors(errors)) {
      const errorMsg = JoiUtil.errorsToMessage(errors);
      this.logger.error(errorMsg);
      response.status = StatusCodes.UNPROCESSABLE_ENTITY;
      response.error = new Error(errorMsg);
      return response;
    }

    const {
      wallet,
      token,
      quantity,
      gate,
      size,
      refs,
    } = params;

    const customerPublicKey = new PublicKey(account);
    const merchantPublicKey = new PublicKey(wallet);

    /**
      * Apply the access gate if one is specified
      */
    try {
      const tokens: TokenDataSummary[] = gate ? await TokenGateUtil.applyAccessGate(gate, customerPublicKey) : [];

      if (gate && tokens.length === 0) {
        const errorMsg = 'User does not have required NFT.';
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
     * Create the transaction
     */
    const ixs: TransactionInstruction[] = [];

    try {
      if (token === TokenTypes.SOL) {
        const amount: number = (size ? size * LAMPORTS_PER_SOL : quantity) ?? 0;

        const merchantTransferIx = SystemProgram.transfer({
          fromPubkey: customerPublicKey,
          toPubkey: merchantPublicKey,
          lamports: amount,
        });

        refs?.forEach((ref: string) => {
          merchantTransferIx.keys.push({ pubkey: new PublicKey(ref), isWritable: false, isSigner: false });
        });

        ixs.push(merchantTransferIx);
      } else if (token === TokenTypes.USDC) {
        const usdcTokenInfo: any = TokenInfo[TokenTypes.USDC];
        const usdcTokenAddress = new PublicKey(usdcTokenInfo.address);
        const amount = (size ? size * (10 ** usdcTokenInfo.decimals) : quantity) ?? 0;

        const params: TransferSplTokenParams[] = [
          {
            fromAccountPublicKey: customerPublicKey,
            toAccountPublicKey: merchantPublicKey,
            splTokenPublicKey: usdcTokenAddress,
            amount,
            feePayerPublicKey: customerPublicKey,
            refs: refs?.map((ref: string) => new PublicKey(ref)) ?? [],
          },
        ];

        const transferIxs = await SolanaUtil.transferTokens({
          transfers: params,
          validateFunds: true,
        });

        ixs.push(...transferIxs);
      }
    } catch (e) {
      const errorMsg = 'Failed to add transfer instructions to transaction.';
      this.logger.error(errorMsg);
      this.logger.error(e);
      response.status = StatusCodes.INTERNAL_SERVER_ERROR;
      response.error = new Error(errorMsg);
      return response;
    }

    let txBuffer: Buffer;

    try {
      const tx = new Transaction()
        .add(...ixs);

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
