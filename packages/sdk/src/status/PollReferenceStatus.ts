/* eslint-disable no-async-promise-executor */
import Joi from 'joi';
import { Status, JSONReponse, StatusResultData } from '../models/shared';
import * as JoiUtil from '../utils/JoiUtil';
import * as WaitUtil from '../utils/WaitUtil';

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

  async status(params: PollReferenceStatusParams): Promise<StatusResultData> {
    return new Promise(async (resolve, reject) => {
      const { ref, interval = 5000, maxRetries = 10 } = params;
      const url = `${this.basePath}${this.path}?ref=${ref}`;

      for (let i = 0; i < maxRetries; i++) {
        await WaitUtil.wait(interval);
        const response = await fetch(url);
        const { data }: JSONReponse<StatusResultData> = await response.json();

        if (data?.signature) {
          resolve(data);
          return;
        }
      }

      reject(new Error('Timeout'));
    });
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
