import Joi from 'joi'
import { Keypair } from '@solana/web3.js'
import { encodeURL } from '@solana/pay'
import * as JSURL from '@bedrock-foundation/jsurl'
import * as JoiUtil from '../utils/JoiUtil'
import {
  Action,
  CreateTransactionRequest,
  CreateTransactionResponse,
  CreateLinkResult,
  BaseTransactionRequestParams
} from '../models/shared'

export type TransferParams = {
  wallet: string
  token: string
  quantity?: number
  size?: number
} & BaseTransactionRequestParams

export type CreateTransferTransactionRequest = CreateTransactionRequest<TransferParams>

export type CreateTransferTransactionResponse = CreateTransactionResponse

export const transferParamsSchema = Joi.object().keys({
  wallet: Joi.string().required(),
  token: Joi.string().required(),
  quantity: Joi.number().optional(),
  size: Joi.number().optional(),
  icon: Joi.string().optional(),
  label: Joi.string().optional(),
  refs: Joi.array().items(Joi.string()).default([])
})

export const transferDeliverySchema = Joi.object()
  .keys({
    account: Joi.string().required(),
    params: transferParamsSchema
  })
  .prefs({
    abortEarly: false
  })

export class TransferAction implements Action<TransferParams, CreateTransferTransactionRequest> {
  public readonly path: string = '/transfer'

  public readonly basePath: string

  constructor(basePath?: string) {
    this.basePath = basePath || 'https://localhost:3001'
  }

  createLink(params: TransferParams): CreateLinkResult {
    const requestRef = Keypair.generate().publicKey.toBase58()
    params.refs = [requestRef, ...(params?.refs ?? [])]
    const url = `${this.basePath}${this.path}?params=${JSURL.stringify(params)}`
    const link = encodeURL({ link: new URL(url) }).toString()

    return {
      link,
      refs: {
        requestRef
      }
    }
  }

  validate(params: TransferParams): JoiUtil.JoiValidatorResponse<TransferParams> {
    return JoiUtil.validate(transferParamsSchema, params)
  }

  validateDelivery(
    params: CreateTransferTransactionRequest
  ): JoiUtil.JoiValidatorResponse<CreateTransferTransactionRequest> {
    return JoiUtil.validate(transferDeliverySchema, params)
  }
}
