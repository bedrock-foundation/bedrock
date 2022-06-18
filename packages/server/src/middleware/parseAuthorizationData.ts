import { NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import {
  AuthorizationData,
} from '@bedrock-foundation/sdk';
import { HTTPRequest } from '../models/shared';

const extractBearerToken = (req: Request): string | undefined => {
  let token;

  const raw = req.headers.authorization || '';
  if (raw.match(/Bearer /)) {
    token = raw.split('Bearer ')[1];
  }
  return token;
};

export const createParseAuthorizationData = (jwtSecret: string) => (request: HTTPRequest<any, any>, _response: never, next: NextFunction): void => {
  const token = extractBearerToken(request);
  if (!token) {
    next();
  } else {
    jwt.verify(token, jwtSecret, (error, data: any) => {
      if (error) {
        console.error(error);
      } else if (data?.accountId) {
        const authData = data as AuthorizationData;
        request.authorizationData = {
          accountId: authData?.accountId?.toString() ?? undefined,
          signature: authData?.signature?.toString() ?? undefined,
          ipAddress: request.headers?.['x-real-ip'] ?? 'localhost',
          token,
        };
      }
      next();
    }) as any;
  }
};
