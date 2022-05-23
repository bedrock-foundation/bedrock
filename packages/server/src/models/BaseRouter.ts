import express, { Request, Response } from 'express';
import {
  StatusCodes,
  DeliveryResponse,
} from '@bedrock-foundation/sdk';

export interface ActionRouter<T> {
  logger: typeof console;
  label: string;
  icon: string;
  path: string;
  router: any;
  get(request: Request, response: Response): Promise<void>;
  post(request: Request<{}, {}, {}, {}>, response: Response): Promise<void>;
  createTransaction: (params: T) => Promise<DeliveryResponse>;
}

export type ActionRouterParams = {
  logger?: typeof console;
  label?: string;
  icon?: string;
  path?: string;
}

export class BaseRouter implements ActionRouter<any> {
  public static readonly label: string = 'MtnPay';

  public static readonly icon: string = 'https://storage.googleapis.com/magically-assets-production/mtnPay.png';

  public logger: typeof console;

  public label: string;

  public icon: string;

  public path: string;

  public router: express.Router;

  constructor(params: ActionRouterParams) {
    this.logger = params.logger ?? console;
    this.label = params.label ?? BaseRouter.label;
    this.icon = params.icon ?? BaseRouter.icon;
    this.path = params.path ?? '';
    this.router = express.Router();
    this.router.get(this.path, this.get.bind(this));
    this.router.post(this.path, this.post.bind(this));
  }

  async get(request: Request, response: Response): Promise<void> {
    const { label, icon } = request.query;

    try {
      response.status(StatusCodes.OK).json({
        label: label ?? this.label ?? BaseRouter.label,
        icon: icon ?? this.icon ?? BaseRouter.icon,
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

  createTransaction(_params: any): Promise<DeliveryResponse> {
    const errorMsg = 'Method not implemented.';
    this.logger.log(errorMsg);
    throw new Error(errorMsg);
  }
}
