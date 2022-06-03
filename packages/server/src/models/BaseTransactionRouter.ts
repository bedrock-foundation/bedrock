import express, { Request, Response } from 'express';
import * as JSURL from '@bedrock-foundation/jsurl';
import {
  CreateTransactionRequest,
  CreateTransactionResponse,
  MetadataRequest,
  MetadataResponse,
  TransactionRequest,
  TransactionResponse,
  StatusCodes,
} from './shared';
import * as JoiUtil from '../utils/JoiUtil';

export interface TransactionRouter<T extends CreateTransactionRequest<any>> {
  logger: typeof console;
  label: string;
  icon: string;
  path: string;
  router: any;
  get(request: MetadataRequest<T>, response: MetadataResponse): Promise<void>;
  post(request: TransactionRequest<T>, response: TransactionResponse): Promise<void>;
  validateTransactionRequest(request: T): JoiUtil.JoiValidatorResponse<T>;
  createTransaction(request: T): Promise<CreateTransactionResponse>;
}

export interface TransactionRouterParams {
  logger?: typeof console;
  label?: string;
  icon?: string;
  path?: string;
}

export class BaseTransactionRouter implements TransactionRouter<any> {
  public static readonly label: string = 'Bedrock Foundation';

  public static readonly icon: string = 'https://storage.googleapis.com/bedrock-platform-assets-production-mainnet/brand/bedrock-logo.png';

  public logger: typeof console;

  public label: string;

  public icon: string;

  public path: string;

  public router: express.Router;

  constructor(params: TransactionRouterParams) {
    this.logger = params.logger ?? console;
    this.label = params.label ?? BaseTransactionRouter.label;
    this.icon = params.icon ?? BaseTransactionRouter.icon;
    this.path = params.path ?? '';
    this.router = express.Router();
    this.router.get(this.path, this.get.bind(this));
    this.router.post(this.path, this.post.bind(this));
  }

  async get(request: MetadataRequest<any>, response: MetadataResponse): Promise<void> {
    const { label, icon } = JSURL.parse<any>(request.query.params);

    try {
      response.status(StatusCodes.OK).json({
        label: label ?? this.label ?? BaseTransactionRouter.label,
        icon: icon ?? this.icon ?? BaseTransactionRouter.icon,
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

  validateTransactionRequest(_request: any): JoiUtil.JoiValidatorResponse<any> {
    const errorMsg = 'Method not implemented.';
    this.logger.log(errorMsg);
    throw new Error(errorMsg);
  }

  async createTransaction(_params: any): Promise<CreateTransactionResponse> {
    const errorMsg = 'Method not implemented.';
    this.logger.log(errorMsg);
    throw new Error(errorMsg);
  }
}
