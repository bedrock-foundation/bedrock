import Joi from 'joi';
import { Keypair } from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import * as JoiUtil from '../utils/JoiUtil';
import {
  Action, ActionParams, CreateLinkResult, DeliveryResponse,
} from '../models/shared';

export interface EmptyWalletParams {}

export type EmptyWalletActionParams = ActionParams<EmptyWalletParams>

export interface EmptyWalletDeliveryResponse extends DeliveryResponse { }

export const emptyWalletParamsSchema = Joi.object().keys({});

export const emptyWalletDeliverySchema = Joi.object().keys({
  account: Joi.string().required(),
  params: emptyWalletParamsSchema,
}).prefs({
  abortEarly: false,
});

export class EmptyWalletAction implements Action<EmptyWalletParams, EmptyWalletActionParams> {
  public readonly path: string = '/empty-wallet';

  public readonly basePath: string;

  constructor(basePath?: string) {
    this.basePath = basePath || 'https://localhost:3001';
  }

  createLink(_params: EmptyWalletParams): CreateLinkResult {
    const ref = Keypair.generate().publicKey.toBase58();
    const url = `${this.basePath}${this.path}`;

    const link = encodeURL({ link: new URL(url) }).toString();

    return {
      link,
      ref,
    };
  }

  validate(params: EmptyWalletParams): JoiUtil.JoiValidatorResponse<EmptyWalletParams> {
    return JoiUtil.validate(
      emptyWalletParamsSchema,
      params,
    );
  }

  validateDelivery(params: EmptyWalletActionParams): JoiUtil.JoiValidatorResponse<EmptyWalletActionParams> {
    return JoiUtil.validate(
      emptyWalletDeliverySchema,
      params,
    );
  }
}
