import {
  CreateLinkResult,
  BaseTransactionRequestParams,
  LinkCreatorParams,
  createLink,
  CreateNonceLinkResult,
  createNonceLink,
} from '../models/createLink';
import { StatusResultData, TokenTypes } from '../models/shared';

export type TransferParams = {
  wallet: string;
  token?: TokenTypes;
  tokenAddress?: string;
  quantity?: number;
  size?: number;
} & BaseTransactionRequestParams;

export type EmptyWalletParams = {} & BaseTransactionRequestParams;

export type AuthorizationParams = {} & BaseTransactionRequestParams;

export type GetReferenceStatusParams = {
  ref: string;
};

export class BedrockCore {
  public static Paths: Record<string, string> = {
    Transfer: '/transfer',
    EmptyWallet: '/empty-wallet',
    Authorization: '/authorization',
    AuthorizationNonce: '/authorization/nonce',
    ReferenceStatus: '/reference-status',
  };

  public basePath: string;

  constructor(params: LinkCreatorParams) {
    this.basePath = params.basePath ?? 'https://pay.bedrock.fyi';
  }

  createTransferLink(params: TransferParams): CreateLinkResult {
    return createLink<TransferParams>(this.basePath, BedrockCore.Paths.Transfer, params);
  }

  createEmptyWalletLink(params: EmptyWalletParams): CreateLinkResult {
    return createLink<EmptyWalletParams>(this.basePath, BedrockCore.Paths.EmptyWallet, params);
  }

  async createAuthorizationNonceLink(params: AuthorizationParams): Promise<CreateNonceLinkResult> {
    return await createNonceLink<AuthorizationParams>(
      this.basePath,
      BedrockCore.Paths.Authorization,
      BedrockCore.Paths.AuthorizationNonce,
      params,
    );
  }

  async getReferenceStatus(params: GetReferenceStatusParams): Promise<StatusResultData> {
    const { ref } = params;
    const url = `${this.basePath}${BedrockCore.Paths.ReferenceStatus}?ref=${ref}`;
    const response = await fetch(url);
    return await response.json();
  }
}
