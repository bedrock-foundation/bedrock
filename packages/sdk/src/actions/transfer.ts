import Joi from 'joi';
import { Keypair } from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import * as JoiUtil from '../utils/JoiUtil';
import {
  Action, ActionParams, CreateLinkResult, DeliveryResponse,
} from '../models/shared';

export interface TransferParams {
  wallet: string;
  payerToken: string;
  ref?: string;
  quantity?: number;
  size?: number;
  icon?: string;
  label?: string;
}

export type TransferActionParams = ActionParams<TransferParams>

export interface TransferDeliveryResponse extends DeliveryResponse { }

export const transferParamsSchema = Joi.object().keys({
  wallet: Joi.string().required(),
  payerToken: Joi.string().required(),
  ref: Joi.string().required(),
  quantity: Joi.number().optional(),
  size: Joi.number().optional(),
  icon: Joi.string().optional(),
  label: Joi.string().optional(),
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
    const ref = Keypair.generate().publicKey.toBase58();
    const url = (() => {
      let result = `${this.basePath}${this.path}?wallet=${params.wallet}&payerToken=${params.payerToken}&ref=${ref}`;
      if (params.quantity) {
        result += `&quantity=${params.quantity}`;
      } else {
        result += `&size=${params.size}`;
      }
      return result;
    })();

    const link = encodeURL({ link: new URL(url) }).toString();

    return {
      link,
      ref,
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
