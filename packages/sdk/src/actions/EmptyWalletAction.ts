import Joi from 'joi';
import { Keypair } from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import * as JoiUtil from '../utils/JoiUtil';
import {
  Action,
  CreateTransactionRequest,
  CreateTransactionResponse,
  CreateLinkResult,
  BaseTransactionRequestParams,
} from '../models/shared';

export type EmptyWalletParams = BaseTransactionRequestParams;

export type CreateEmptyWalletTransactionRequest = CreateTransactionRequest<EmptyWalletParams>

export type CreateEmptyWalletTransactionResponse = CreateTransactionResponse;

export const emptyWalletParamsSchema = Joi.object().keys({});

export const emptyWalletDeliverySchema = Joi.object().keys({
  account: Joi.string().required(),
  params: emptyWalletParamsSchema,
}).prefs({
  abortEarly: false,
});

export class EmptyWalletAction implements Action<EmptyWalletParams, CreateEmptyWalletTransactionRequest> {
  public readonly path: string = '/empty-wallet';

  public readonly basePath: string;

  constructor(basePath?: string) {
    this.basePath = basePath || 'https://localhost:3001';
  }

  createLink(_params: EmptyWalletParams): CreateLinkResult {
    const requestRef = Keypair.generate().publicKey.toBase58();
    const url = `${this.basePath}${this.path}`;

    const urlWithRefs = `${url}&requestRef=${requestRef}`;
    const link = encodeURL({ link: new URL(urlWithRefs) }).toString();

    return {
      link,
      refs: {
        requestRef,
      },
    };
  }

  validate(params: EmptyWalletParams): JoiUtil.JoiValidatorResponse<EmptyWalletParams> {
    return JoiUtil.validate(
      emptyWalletParamsSchema,
      params,
    );
  }

  validateDelivery(params: CreateEmptyWalletTransactionRequest): JoiUtil.JoiValidatorResponse<CreateEmptyWalletTransactionRequest> {
    return JoiUtil.validate(
      emptyWalletDeliverySchema,
      params,
    );
  }
}
