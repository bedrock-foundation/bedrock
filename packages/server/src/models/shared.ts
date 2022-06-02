import { JsUrl } from '@bedrock-foundation/jsurl';
import { StatusCodes } from '@bedrock-foundation/sdk';
import { Request, Response } from 'express';

/** ******************************************************************************
* HTTP
******************************************************************************* */

export type HTTPRequest<PostBody, QueryStringParams> = Request<{}, {}, PostBody, QueryStringParams>;

export type HTTPResponse<ResponseData> = Response<ResponseData>;

export type TransactionRequest<TransactionRequestParams> = HTTPRequest<{ account: string }, { params: JsUrl<TransactionRequestParams>}>

export type TransactionResponse = HTTPResponse<{transaction: string | null, message?: string}>

export type MetadataRequest<MetadataRequestParams> = HTTPRequest<never, { params: JsUrl<MetadataRequestParams> }>

export type MetadataResponse = HTTPResponse<{icon: string, label: string}>

export type NonceRequest<NonceRequestParams> = HTTPRequest<never, { params: JsUrl<NonceRequestParams> }>

export type NonceResponse = HTTPResponse<{ nonce: string | null, message?: string}>

export interface CreateTransactionRequest<T> {
  account: string;
  params: T;
}

export interface CreateTransactionResponse {
  txBuffer?: Buffer;
  error?: Error;
  status: StatusCodes;
}
