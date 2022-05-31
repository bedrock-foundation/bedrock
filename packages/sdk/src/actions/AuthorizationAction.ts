import Joi from 'joi';
import { Keypair } from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import * as JSURL from '@bedrock-foundation/jsurl';
import * as JoiUtil from '../utils/JoiUtil';
import {
  Action,
  CreateTransactionRequest,
  CreateTransactionResponse,
  CreateLinkResult,
  BaseTransactionRequestParams,
} from '../models/shared';

export type AuthorizationParams = {} & BaseTransactionRequestParams;

export type CreateAuthorizationTransactionRequest = CreateTransactionRequest<AuthorizationParams>;

export type CreateAuthorizationTransactionResponse = CreateTransactionResponse;

export const authorizationParamsSchema = Joi.object().keys({});

export const authorizationDeliverySchema = Joi.object().keys({
  account: Joi.string().required(),
  params: Joi.any(),
}).prefs({
  abortEarly: false,
});

export class AuthorizationAction implements Action<AuthorizationParams, CreateAuthorizationTransactionRequest> {
  public readonly path: string = '/authorize';

  public readonly noncePath: string = '/authorize/nonce';

  public readonly basePath: string;

  constructor(basePath?: string) {
    this.basePath = basePath || 'https://localhost:3001';
  }

  createLink(params: AuthorizationParams): CreateLinkResult {
    const requestRef = Keypair.generate().publicKey.toBase58();
    params.refs = [requestRef, ...(params?.refs ?? [])];
    const url = `${this.basePath}${this.path}?params=${JSURL.stringify(params)}`;
    const nonceUrl = `${this.basePath}${this.noncePath}?params=${JSURL.stringify(params)}`;
    const link = encodeURL({ link: new URL(url) }).toString();

    return {
      link,
      nonceUrl,
      refs: {
        requestRef,
      },
    };
  }

  async createNonceLink(params: AuthorizationParams): Promise<CreateLinkResult> {
    const result = this.createLink(params);
    if (!result.nonceUrl) return result;

    const response = await fetch(result?.nonceUrl);
    const { nonce } = await response.json();
    result.nonce = nonce;
    return result;
  }

  validate(params: AuthorizationParams): JoiUtil.JoiValidatorResponse<AuthorizationParams> {
    return JoiUtil.validate(
      authorizationParamsSchema,
      params,
    );
  }

  validateDelivery(params: CreateAuthorizationTransactionRequest): JoiUtil.JoiValidatorResponse<CreateAuthorizationTransactionRequest> {
    return JoiUtil.validate(
      authorizationDeliverySchema,
      params,
    );
  }
}
