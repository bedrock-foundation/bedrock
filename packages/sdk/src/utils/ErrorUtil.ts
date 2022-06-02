import { StatusCodes } from '../models/shared';

export const isSuccessfulResponse = (response: any): boolean => response.status === StatusCodes.OK;
