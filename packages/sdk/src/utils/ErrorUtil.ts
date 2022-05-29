import { StatusCodes, CreateTransactionResponse } from '../models/shared';

export const isSuccessfulResponse = (response: CreateTransactionResponse): boolean => response.status === StatusCodes.OK;
