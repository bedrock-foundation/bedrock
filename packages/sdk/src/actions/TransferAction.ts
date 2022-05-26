import Joi from 'joi';
import { Keypair, PublicKey } from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import base58 from 'bs58';
import { sha256 } from '@ethersproject/sha2';
import * as JoiUtil from '../utils/JoiUtil';
import {
  Action, ActionParams, CreateLinkResult, DeliveryResponse,
} from '../models/shared';

export interface TransferParams {
  wallet: string;
  payerToken: string;
  requestRef: string;
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
  requestRef: Joi.string().required(),
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

const BEDROCK_PUBLIC_KEY = new PublicKey('9KiZ7j5BAh5zTs5AaoPnPKotWPj9ZSkxo6Dm9s88DKnT');

export class TransferAction implements Action<TransferParams, TransferActionParams> {
  public readonly path: string = '/transfer';

  public readonly basePath: string;

  constructor(basePath?: string) {
    this.basePath = basePath || 'https://localhost:3001';
  }

  createLink(params: TransferParams): CreateLinkResult {
    console.log('typeof window', typeof window);
    const requestRef = Keypair.generate().publicKey.toBase58();
    const url = (() => {
      let result = `${this.basePath}${this.path}?wallet=${params.wallet}&payerToken=${params.payerToken}`;
      if (params.quantity) {
        result += `&quantity=${params.quantity}`;
      } else {
        result += `&size=${params.size}`;
      }
      return result;
    })();
    const paramBuffer = Buffer.from(base58.encode(Buffer.from(url)));
    const finalBuffer = Buffer.concat([BEDROCK_PUBLIC_KEY.toBuffer(), paramBuffer]);
    const hash = sha256(new Uint8Array(finalBuffer)).slice(2);
    const paramsRef = new PublicKey(Buffer.from(hash, 'hex')).toBase58();
    const bedrockRef = BEDROCK_PUBLIC_KEY.toBase58();
    const urlWithRefs = `${url}&requestRef=${requestRef}`;
    const link = encodeURL({ link: new URL(urlWithRefs) }).toString();

    console.log(link);

    return {
      link,
      refs: {
        requestRef,
        paramsRef,
        bedrockRef,
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
