import Joi from 'joi';
import {
  BedrockCore, GetReferenceStatusParams, StatusData, TransactionStatuses,
} from '@bedrock-foundation/sdk';
import express from 'express';
import { PublicKey } from '@solana/web3.js';
import RPCConnection from '../../utils/RPCConnection';
import {
  HTTPRequest,
  HTTPResponse,
  isSuccessfulResponse,
  StatusCodes,
} from '../../models/shared';
import * as JoiUtil from '../../utils/JoiUtil';

export const getReferenceStatusParamsSchema = Joi.object().keys({
  ref: Joi.string().required(),
}).prefs({
  abortEarly: false,
});

export interface GetReferenceStatusResult {
  data?: StatusData;
  error?: Error;
  status: StatusCodes;
}

export type GetReferenceStatusRequest = HTTPRequest<never, GetReferenceStatusParams>

export type GetReferenceStatusResponse = HTTPResponse<StatusData>

export type StatusRouterParams = {
  logger: typeof console;
}

export class GetReferenceStatusRouter {
  public logger: typeof console;

  public path: string;

  public router: express.Router;

  constructor(params: StatusRouterParams) {
    this.logger = params.logger ?? console;
    this.path = BedrockCore.Paths.ReferenceStatus;
    this.router = express.Router();
    this.router.get(this.path, this.get.bind(this));
  }

  async get(request: GetReferenceStatusRequest, response: GetReferenceStatusResponse): Promise<void> {
    try {
      const result = await this.status(request.query);

      if (!isSuccessfulResponse(result)) {
        throw new Error(result?.error?.message);
      }

      response.status(result.status).json(result.data);
    } catch (e: any) {
      this.logger.error(e);
      response.status(StatusCodes.BAD_REQUEST).send({
        status: TransactionStatuses.Unknown,
        message: e.message,
      });
    }
  }

  validateGetReferenceStatusParams(params: GetReferenceStatusParams): JoiUtil.JoiValidatorResponse<GetReferenceStatusParams> {
    return JoiUtil.validate(
      getReferenceStatusParamsSchema,
      params,
    );
  }

  async status(params: GetReferenceStatusParams): Promise<GetReferenceStatusResult> {
    const response: GetReferenceStatusResult = {
      status: StatusCodes.UNKNOWN_CODE,
    };

    const { value, errors } = this.validateGetReferenceStatusParams(
      params,
    );

    const {
      ref,
    }: GetReferenceStatusParams = value;

    console.log(value);

    if (JoiUtil.hasErrors(errors)) {
      console.log('HIT HERE');
      const errorMsg = JoiUtil.errorsToMessage(errors);
      this.logger.error(errorMsg);
      response.status = StatusCodes.UNPROCESSABLE_ENTITY;
      response.error = new Error(errorMsg);
      return response;
    }

    try {
      console.log('HIT SIGNATURE');
      const signatures = await RPCConnection.getSignaturesForAddress(new PublicKey(ref), {}, 'confirmed');
      const signature = signatures?.[0]?.signature ?? null;
      response.data = {
        signature,
        status: signature
          ? TransactionStatuses.Confirmed
          : TransactionStatuses.Pending,
      };
      response.status = StatusCodes.OK;
      return response;
    } catch (e) {
      const errorMsg = `Failed to get signature for ref ${ref}`;
      this.logger.error(errorMsg);
      this.logger.error(e);
      response.status = StatusCodes.INTERNAL_SERVER_ERROR;
      response.error = new Error(errorMsg);
      return response;
    }
  }
}
