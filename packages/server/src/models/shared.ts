import { JsUrl } from '@bedrock-foundation/jsurl';
import { AuthorizationData } from '@bedrock-foundation/sdk';
import { Request, Response } from 'express';

export interface HTTPRequest<PostBody, QueryStringParams> extends Request<{}, {}, PostBody, QueryStringParams> {
  authorizationData?: any;
}

export type HTTPResponse<ResponseData> = Response<ResponseData>;

export type TransactionRequest<TransactionRequestParams> = HTTPRequest<{ account: string }, { params: JsUrl<TransactionRequestParams>}>

export type TransactionResponse = HTTPResponse<{transaction: string | null, message?: string}>

export type MetadataRequest<MetadataRequestParams> = HTTPRequest<never, { params: JsUrl<MetadataRequestParams> }>

export type MetadataResponse = HTTPResponse<{icon: string, label: string}>

export type NonceRequest<NonceRequestParams> = HTTPRequest<never, { params: JsUrl<NonceRequestParams> }>

export type NonceResponse = HTTPResponse<{ nonce: string | null, message?: string}>

export type StatusRequest<StatusRequestParams> = HTTPRequest<never, StatusRequestParams>

export type StatusResponse = HTTPResponse<{ nonce: string | null, message?: string }>

export interface CreateTransactionRequest<Params> {
  account: string;
  params: Params;
}

export interface CreateTransactionResponse {
  txBuffer?: Buffer;
  error?: Error;
  status: StatusCodes;
}

export enum StatusCodes {
  UNKNOWN_CODE = 0,
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  GATEWAY_TIMEOUT = 504,
}

export const isSuccessfulResponse = (response: CreateTransactionResponse): boolean => response.status === StatusCodes.OK;
