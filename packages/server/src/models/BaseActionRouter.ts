import express, { Request, Response } from 'express';
import {
  StatusCodes,
  CreateTransactionResponse,
  CreateTransactionRequest,
} from '@bedrock-foundation/sdk';
import * as JSURL from '@bedrock-foundation/jsurl';
import {
  MetadataRequest, MetadataResponse, TransactionRequest, TransactionResponse,
} from './shared';

export interface ActionRouter<T extends CreateTransactionRequest<any>> {
  logger: typeof console;
  label: string;
  icon: string;
  path: string;
  router: any;
  get(request: MetadataRequest<T>, response: MetadataResponse): Promise<void>;
  post(request: TransactionRequest<T>, response: TransactionResponse): Promise<void>;
  createTransaction: (request: T) => Promise<CreateTransactionResponse>;
}

export type ActionRouterParams = {
  logger?: typeof console;
  label?: string;
  icon?: string;
  path?: string;
}

export class BaseActionRouter implements ActionRouter<any> {
  public static readonly label: string = 'Bedrock Foundation';

  public static readonly icon: string = 'https://storage.googleapis.com/magically-assets-production/bedrock-logo.png';

  public logger: typeof console;

  public label: string;

  public icon: string;

  public path: string;

  public router: express.Router;

  constructor(params: ActionRouterParams) {
    this.logger = params.logger ?? console;
    this.label = params.label ?? BaseActionRouter.label;
    this.icon = params.icon ?? BaseActionRouter.icon;
    this.path = params.path ?? '';
    this.router = express.Router();
    this.router.get(this.path, this.get.bind(this));
    this.router.post(this.path, this.post.bind(this));
  }

  async get(request: MetadataRequest<any>, response: MetadataResponse): Promise<void> {
    const { label, icon } = JSURL.parse<any>(request.query.params);

    try {
      response.status(StatusCodes.OK).json({
        label: label ?? this.label ?? BaseActionRouter.label,
        icon: icon ?? this.icon ?? BaseActionRouter.icon,
      });
    } catch (e) {
      this.logger.error(e);
      response.status(StatusCodes.BAD_REQUEST).send();
    }
  }

  async post(_request: Request<{}, {}, {}, {}>, _response: Response): Promise<void> {
    const errorMsg = 'Method not implemented.';
    this.logger.log(errorMsg);
    throw new Error(errorMsg);
  }

  createTransaction(_params: any): Promise<CreateTransactionResponse> {
    const errorMsg = 'Method not implemented.';
    this.logger.log(errorMsg);
    throw new Error(errorMsg);
  }
}
