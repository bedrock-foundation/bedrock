import { JsUrl } from '@bedrock-foundation/jsurl';
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
