import { Keypair } from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import * as JSURL from '@bedrock-foundation/jsurl';

export interface BaseTransactionRequestParams {
  icon?: string;
  label?: string;
  refs?: string[];
}

export interface CreateLinkRefs {
  requestRef: string;
  paramsRef?: string;
  bedrockRef?: string;
}

export interface CreateLinkResult {
  link: string;
  refs: CreateLinkRefs;
}

export interface CreateNonceLinkResult extends CreateLinkResult {
  nonceUrl: string;
  nonce: string;
}

export type LinkCreatorParams = {
  basePath?: string;
};

export function createLink<T extends BaseTransactionRequestParams>(
  basePath: string,
  path: string,
  params: T,
): CreateLinkResult {
  const requestRef = Keypair.generate().publicKey.toBase58();
  params.refs = [requestRef, ...(params?.refs ?? [])];
  const url = `${basePath}${path}?params=${JSURL.stringify(params)}`;
  const link = encodeURL({ link: new URL(url) }).toString();
  return {
    link,
    refs: {
      requestRef,
    },
  };
}

export async function createNonceLink<T extends BaseTransactionRequestParams>(
  basePath: string,
  path: string,
  noncePath: string,
  params: T,
): Promise<CreateNonceLinkResult> {
  const result = createLink(basePath, path, params);
  params.refs = [result.refs.requestRef, ...(params?.refs ?? [])];
  const nonceUrl = `${basePath}${noncePath}?params=${JSURL.stringify(params)}`;
  const response = await fetch(nonceUrl);
  const { nonce } = await response.json();
  const finalResult: CreateNonceLinkResult = { ...result, nonce, nonceUrl };
  return finalResult;
}
