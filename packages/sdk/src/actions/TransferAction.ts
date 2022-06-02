import { Keypair } from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import * as JSURL from '@bedrock-foundation/jsurl';
import {
  Action,
  CreateLinkResult,
  BaseTransactionRequestParams,
} from '../models/shared';

export type TransferParams = {
  wallet: string;
  token: string;
  quantity?: number;
  size?: number;
} & BaseTransactionRequestParams;

export class TransferAction implements Action<TransferParams> {
  public readonly path: string = '/transfer';

  public readonly basePath: string;

  constructor(basePath?: string) {
    this.basePath = basePath ?? 'https://localhost:3001';
  }

  createLink(params: TransferParams): CreateLinkResult {
    const requestRef = Keypair.generate().publicKey.toBase58();
    params.refs = [requestRef, ...(params?.refs ?? [])];
    const url = `${this.basePath}${this.path}?params=${JSURL.stringify(params)}`;
    const link = encodeURL({ link: new URL(url) }).toString();

    return {
      link,
      refs: {
        requestRef,
      },
    };
  }
}
