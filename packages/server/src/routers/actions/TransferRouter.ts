import {
  TransactionInstruction,
  LAMPORTS_PER_SOL,
  SystemProgram,
  PublicKey,
  Transaction,
} from '@solana/web3.js';
import {
  TransferAction,
  TransferParams,
  TransferActionParams,
  TransferDeliveryResponse,
  JoiUtil,
  ErrorUtil,
  StatusCodes,
  TokenTypes,
  TokenInfo,
} from '@bedrock-foundation/sdk';
import express, { Request, Response } from 'express';
import RPCConnection from '../../utils/RPCConnection';
import SolanaUtil, { TransferSplTokenParams } from '../../utils/SolanaUtil';
import { ActionRouter, BaseActionRouter, ActionRouterParams } from '../../models/BaseActionRouter';

const transfer = new TransferAction();

export class TransferRouter extends BaseActionRouter implements ActionRouter<TransferActionParams> {
  constructor(params: ActionRouterParams = {}) {
    super(params);
    this.path = transfer.path;
    this.router = express.Router();
    this.router.get(this.path, super.get.bind(this));
    this.router.post(this.path, this.post.bind(this));
  }

  async post(req: Request<{}, {}, { account: string }, TransferParams>, res: Response): Promise<void> {
    const { account } = req.body;

    try {
      const request: TransferActionParams = {
        account,
        params: req.query,
      };

      const response = await this.createTransaction(request);

      if (!ErrorUtil.isSuccessfulResponse(response)) {
        throw new Error(response?.error?.message);
      }

      res.status(response.status).json({
        transaction: response?.txBuffer?.toString('base64'),
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

  async createTransaction(request: TransferActionParams): Promise<TransferDeliveryResponse> {
    const response: TransferDeliveryResponse = {
      status: StatusCodes.UNKNOWN_CODE,
    };

    const { value, errors } = transfer.validateDelivery(
      request,
    );

    const {
      account,
      params,
    }: TransferActionParams = value;

    if (JoiUtil.hasErrors(errors)) {
      const errorMsg = JoiUtil.errorsToMessage(errors);
      this.logger.error(errorMsg);
      response.status = StatusCodes.UNPROCESSABLE_ENTITY;
      response.error = new Error(errorMsg);
      return response;
    }

    const {
      wallet,
      payerToken,
      quantity,
      size,
      requestRef,
    } = params;

    console.log('requestRef', requestRef);

    /**
     * Create the transaction
     */
    const customerPublicKey = new PublicKey(account);
    const merchantPublicKey = new PublicKey(wallet);
    const ixs: TransactionInstruction[] = [];

    try {
      if (payerToken === TokenTypes.SOL) {
        const amount: number = (size ? size * LAMPORTS_PER_SOL : quantity) ?? 0;

        const merchantTransferIx = SystemProgram.transfer({
          fromPubkey: customerPublicKey,
          toPubkey: merchantPublicKey,
          lamports: amount,
        });

        merchantTransferIx.keys.push({ pubkey: new PublicKey(requestRef), isWritable: false, isSigner: false });

        ixs.push(merchantTransferIx);
      } else if (payerToken === TokenTypes.USDC) {
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
            refs: [new PublicKey(requestRef)],
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
