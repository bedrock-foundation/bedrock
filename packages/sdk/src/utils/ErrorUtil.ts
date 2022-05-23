import { DeliveryResponse, StatusCodes } from '../models/shared';

export const isSuccessfulResponse = (response: DeliveryResponse): boolean => response.status === StatusCodes.OK;
