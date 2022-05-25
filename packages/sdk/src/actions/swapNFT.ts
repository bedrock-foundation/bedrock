import Joi from 'joi';
import { Keypair } from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import * as JoiUtil from '../utils/JoiUtil';
import {
  Action, ActionParams, CreateLinkResult, DeliveryResponse,
} from '../models/shared';

export interface SwapNFTParams {}

export type SwapNFTActionParams = ActionParams<SwapNFTParams>

export interface SwapNFTDeliveryResponse extends DeliveryResponse { }

export const swapNFTParamsSchema = Joi.object().keys({});

export const swapNFTDeliverySchema = Joi.object().keys({
  account: Joi.string().required(),
  params: swapNFTParamsSchema,
}).prefs({
  abortEarly: false,
});

export class SwapNFTAction implements Action<SwapNFTParams, SwapNFTActionParams> {
  public readonly path: string = '/swap-nft';

  public readonly basePath: string;

  constructor(basePath?: string) {
    this.basePath = basePath || 'https://localhost:3001';
  }

  createLink(_params: SwapNFTParams): CreateLinkResult {
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

  validate(params: SwapNFTParams): any {
    console.log(this);
    return JoiUtil.validate(
      swapNFTParamsSchema,
      params,
    );
  }

  validateDelivery(params: SwapNFTActionParams): any {
    console.log(this);
    return JoiUtil.validate(
      swapNFTDeliverySchema,
      params,
    );
  }
}
