import express from 'express';
import {
  StatusResult,
} from '@bedrock-foundation/sdk';
import {
  HTTPRequest,
  HTTPResponse,
} from './shared';

export interface StatusRouter<QueryStringParams, ResponseData> {
  logger: typeof console;
  path: string;
  router: any;
  get(request: HTTPRequest<never, QueryStringParams>, response: HTTPResponse<ResponseData>): Promise<void>;
  status(params: QueryStringParams): Promise<StatusResult<ResponseData>>;
}

export type StatusRouterParams = {
  logger?: typeof console;
  label?: string;
  icon?: string;
  path?: string;
}

export class BaseStatusRouter<QueryStringParams, ResponseData> implements StatusRouter<QueryStringParams, ResponseData> {
  public logger: typeof console;

  public path: string;

  public router: express.Router;

  constructor(params: StatusRouterParams) {
    this.logger = params.logger ?? console;
    this.path = params.path ?? '';
    this.router = express.Router();
    this.router.get(this.path, this.get.bind(this));
  }

  async get(_request: HTTPRequest<never, QueryStringParams>, _response: HTTPResponse<ResponseData>): Promise<void> {
    const errorMsg = 'Method not implemented.';
    this.logger.log(errorMsg);
    throw new Error(errorMsg);
  }

  async status(_params: QueryStringParams): Promise<StatusResult<ResponseData>> {
    const errorMsg = 'Method not implemented.';
    this.logger.log(errorMsg);
    throw new Error(errorMsg);
  }
}
