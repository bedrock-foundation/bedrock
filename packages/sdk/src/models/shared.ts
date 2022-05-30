import * as JoiUtil from '../utils/JoiUtil';

/** ******************************************************************************
* Status Codes
******************************************************************************* */

export enum StatusCodes {
  UNKNOWN_CODE = 0,
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  GATEWAY_TIMEOUT = 504,
}

/** ******************************************************************************
* Action Creation
******************************************************************************* */

export interface BaseTransactionRequestParams {
  icon?: string;
  label?: string;
  refs?: string[];
}

export interface CreateTransactionRequest<T extends BaseTransactionRequestParams> {
  account: string;
  params: T;
}

export interface CreateTransactionResponse {
  txBuffer?: Buffer;
  error?: Error;
  status: StatusCodes;
}

export interface CreateLinkRefs {
  requestRef: string;
  paramsRef?: string;
  bedrockRef?: string;
}

export interface CreateLinkResult {
  link: string;
  refs: CreateLinkRefs;
}

export interface Action<T, K extends CreateTransactionRequest<T>> {
  createLink: (params: K['params']) => CreateLinkResult;
  validate: (params: K['params']) => JoiUtil.JoiValidatorResponse<T>;
  validateDelivery: (params: K) => JoiUtil.JoiValidatorResponse<K>;
}

/** ******************************************************************************
* Status
******************************************************************************* */

export interface Status<Params, Result, QueryStringParams> {
  status: (params: Params) => Promise<Result>
  validate: (params: Params) => JoiUtil.JoiValidatorResponse<Params>
  validateQueryStringParams: (params: QueryStringParams) => JoiUtil.JoiValidatorResponse<QueryStringParams>
}

export interface StatusResult<Data> {
  data?: Data;
  error?: Error;
  status: StatusCodes;
}

export interface StatusResultData {
  signature?: string | null;
  message?: string;
}

/** ******************************************************************************
* Tokens
******************************************************************************* */

export enum TokenTypes {
  SOL = 'SOL',
  USDC = 'USDC',
  Loyal = 'Loyal',
}

export const TokenInfo: Record<string, object> = {
  [TokenTypes.SOL]: {
    sign: '◎',
    chainId: 103,
    address: 'So11111111111111111111111111111111111111112',
    symbol: 'SOL',
    name: 'Wrapped SOL',
    decimals: 9,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
    extensions: {
      coingeckoId: 'solana',
    },
  },
  [TokenTypes.USDC]: {
    sign: '$',
    chainId: 101,
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
    tags: [
      'stablecoin',
    ],
    extensions: {
      coingeckoId: 'usd-coin',
      serumV3Usdt: '77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS',
      website: 'https://www.centre.io/',
    },
  },
  [TokenTypes.Loyal]: {
    sign: 'L',
    chainId: 101,
    address: 'ASUwfYAFCkuzgeJUxwvRZ5Pg4CGWUSiG7AKbdun34XgP',
    symbol: 'LOYAL',
    name: 'Loyal Rewards',
    decimals: 0,
    logoURI: 'https://storage.googleapis.com/magically-assets-production/loyal-token/icon.png',
    tags: [
      'stablecoin',
    ],
    extensions: {
      website: 'https://loyal.fyi',
    },
  },
};
