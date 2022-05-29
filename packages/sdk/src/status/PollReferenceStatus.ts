/* eslint-disable no-async-promise-executor */
import Joi from 'joi';
import { Status, StatusResultData } from '../models/shared';
import * as JoiUtil from '../utils/JoiUtil';

export interface PollReferenceQueryStringParams {
  ref: string;
}

export const PollReferenceQueryStringParamsSchema = Joi.object().keys({
  ref: Joi.string().required(),
});

export interface PollReferenceStatusParams extends PollReferenceQueryStringParams {
  interval?: number;
  maxRetries?: number;
}

export const pollReferenceStatusParamsSchema = Joi.object().keys({
  ref: Joi.string().required(),
  interval: Joi.number().optional(),
  maxRetries: Joi.number().optional(),
});

export class PollReferenceStatus implements Status<PollReferenceStatusParams, StatusResultData, PollReferenceQueryStringParams> {
  public readonly path: string = '/poll-reference-status';

  public readonly basePath: string;

  constructor(basePath?: string) {
    this.basePath = basePath || 'https://localhost:3001';
  }

  async status(params: PollReferenceQueryStringParams): Promise<StatusResultData> {
    const { ref } = params;
    const url = `${this.basePath}${this.path}?ref=${ref}`;
    const response = await fetch(url);
    return await response.json();
  }

  validate(params: PollReferenceStatusParams): JoiUtil.JoiValidatorResponse<PollReferenceStatusParams> {
    return JoiUtil.validate(
      pollReferenceStatusParamsSchema,
      params,
    );
  }

  validateQueryStringParams(params: PollReferenceQueryStringParams): JoiUtil.JoiValidatorResponse<PollReferenceQueryStringParams> {
    return JoiUtil.validate(
      PollReferenceQueryStringParamsSchema,
      params,
    );
  }
}
