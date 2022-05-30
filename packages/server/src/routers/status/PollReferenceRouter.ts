import {
  PollReferenceStatus,
  PollReferenceQueryStringParams,
  StatusResult,
  StatusCodes,
  JoiUtil,
  ErrorUtil,
  StatusResultData,
} from '@bedrock-foundation/sdk';
import express from 'express';
import { PublicKey } from '@solana/web3.js';
import RPCConnection from '../../utils/RPCConnection';
import {
  BaseStatusRouter, StatusRouterParams,
} from '../../models/BaseStatusRouter';
import { HTTPRequest, HTTPResponse } from '../../models/shared';

const pollReference = new PollReferenceStatus();

export class PollReferenceRouter extends BaseStatusRouter<PollReferenceQueryStringParams, StatusResultData> {
  public path: string;

  public router: express.Router;

  constructor(params: StatusRouterParams = {}) {
    super(params);
    this.path = pollReference.path;
    this.router = express.Router();
    this.router.get(this.path, this.get.bind(this));
  }

  async get(request: HTTPRequest<never, PollReferenceQueryStringParams>, response: HTTPResponse<StatusResultData>): Promise<void> {
    try {
      const result = await this.status(request.query);

      if (!ErrorUtil.isSuccessfulResponse(result)) {
        throw new Error(result?.error?.message);
      }

      response.status(result.status).json(result.data);
    } catch (e: any) {
      this.logger.error(e);
      response.status(StatusCodes.BAD_REQUEST).send({
        message: e.message,
      });
    }
  }

  async status(params: PollReferenceQueryStringParams): Promise<StatusResult<StatusResultData>> {
    const response: StatusResult<StatusResultData> = {
      status: StatusCodes.UNKNOWN_CODE,
    };

    const { value, errors } = pollReference.validateQueryStringParams(
      params,
    );

    const {
      ref,
    }: PollReferenceQueryStringParams = value;

    if (JoiUtil.hasErrors(errors)) {
      const errorMsg = JoiUtil.errorsToMessage(errors);
      this.logger.error(errorMsg);
      response.status = StatusCodes.UNPROCESSABLE_ENTITY;
      response.error = new Error(errorMsg);
      return response;
    }

    try {
      const signatures = await RPCConnection.getSignaturesForAddress(new PublicKey(ref), {}, 'confirmed');
      response.data = { signature: signatures?.[0]?.signature ?? null };
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
