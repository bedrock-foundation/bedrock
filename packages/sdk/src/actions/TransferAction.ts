import Joi from 'joi';
import { Keypair } from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import * as JSURL from '@bedrock-foundation/jsurl';
import * as JoiUtil from '../utils/JoiUtil';
import {
  Action, ActionParams, CreateLinkResult, DeliveryResponse,
} from '../models/shared';

export interface TransferParams {
  wallet: string;
  token: string;
  quantity?: number;
  size?: number;
  icon?: string;
  label?: string;
  refs?: string[];
}

export type TransferActionParams = ActionParams<TransferParams>

export interface TransferDeliveryResponse extends DeliveryResponse { }

export const transferParamsSchema = Joi.object().keys({
  wallet: Joi.string().required(),
  token: Joi.string().required(),
  quantity: Joi.number().optional(),
  size: Joi.number().optional(),
  icon: Joi.string().optional(),
  label: Joi.string().optional(),
  refs: Joi.array().items(Joi.string()).default([]),
});

export const transferDeliverySchema = Joi.object().keys({
  account: Joi.string().required(),
  params: transferParamsSchema,
}).prefs({
  abortEarly: false,
});

export class TransferAction implements Action<TransferParams, TransferActionParams> {
  public readonly path: string = '/transfer';

  public readonly basePath: string;

  constructor(basePath?: string) {
    this.basePath = basePath || 'https://localhost:3001';
  }

  createLink(params: TransferParams): CreateLinkResult {
    const requestRef = Keypair.generate().publicKey.toBase58();
    params.refs = [requestRef, ...(params?.refs ?? [])];
    const url = `${this.basePath}${this.path}?params=${JSURL.stringify(params)}`;
    const link = encodeURL({ link: new URL(url) }).toString();

    console.log(link);
    return {
      link,
      refs: {
        requestRef,
      },
    };
  }

  validate(params: TransferParams): JoiUtil.JoiValidatorResponse<TransferParams> {
    return JoiUtil.validate(
      transferParamsSchema,
      params,
    );
  }

  validateDelivery(params: TransferActionParams): JoiUtil.JoiValidatorResponse<TransferActionParams> {
    return JoiUtil.validate(
      transferDeliverySchema,
      params,
    );
  }
}
