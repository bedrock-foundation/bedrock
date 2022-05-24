import Joi from 'joi';
import * as JoiUtil from '../utils/JoiUtil';

export interface PollReferenceParams {
  ref: string;
  interval?: number;
  maxRetries?: number;
}

interface StatusParams<T> {
  params: T;
}

export type PollReferenceStatusParams = StatusParams<PollReferenceParams>

interface StatusResult {
  signature: string | null;
}

type JSONResponse = {
  data?: StatusResult
}

export const pollRefStatusParamsSchema = Joi.object().keys({
  ref: Joi.string().required(),
});

export const pollRefStatusDeliverySchema = Joi.object().keys({
  account: Joi.string().required(),
  params: pollRefStatusParamsSchema,
}).prefs({
  abortEarly: false,
});

export class PollReferenceStatus {
  public readonly path: string = '/poll-reference-status';

  public readonly basePath: string;

  constructor(basePath?: string) {
    this.basePath = basePath || 'https://localhost:3001';
  }

  async pollRefStatus(params: PollReferenceParams): Promise<StatusResult> {
    return new Promise((resolve, reject) => {
      const { ref, interval = 5000, maxRetries = 10 } = params;
      const url = `${this.basePath}${this.path}?ref=${ref}`;
      let attempts = 0;

      const intervalCounter = setInterval(async () => {
        attempts++;
        const response = await fetch(url);
        const { data }: JSONResponse = await response.json();

        if (data?.signature) {
          clearInterval(intervalCounter);
          resolve(data);
        } else if (attempts >= maxRetries) {
          clearInterval(intervalCounter);
          attempts++;
          reject(new Error('Timeout'));
        }
      }, interval);
    });
  }

  validate(params: PollReferenceParams): JoiUtil.JoiValidatorResponse<PollReferenceParams> {
    return JoiUtil.validate(
      pollRefStatusParamsSchema,
      params,
    );
  }
}
