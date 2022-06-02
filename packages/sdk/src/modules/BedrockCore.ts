import {
  CreateLinkResult,
  BaseTransactionRequestParams,
  LinkCreatorParams,
  createLink,
  CreateNonceLinkResult,
  createNonceLink,
} from '../models/createLink';

export type TransferParams = {
  wallet: string;
  token: string;
  quantity?: number;
  size?: number;
} & BaseTransactionRequestParams;

export type EmptyWalletParams = {} & BaseTransactionRequestParams;

export type AuthorizationParams = {} & BaseTransactionRequestParams;

export class BedrockCore {
  public static Paths: Record<string, string> = {
    Transfer: '/transfer',
    EmptyWallet: '/empty-wallet',
    Authorization: '/authorization',
    AuthorizationNonce: '/authorization/nonce',
  };

  public basePath: string;

  constructor(params: LinkCreatorParams) {
    this.basePath = params.basePath ?? 'https://pay.bedrock.fyi';
  }

  createTransferLink(params: TransferParams): CreateLinkResult {
    return createLink(this.basePath, BedrockCore.Paths.Transfer, params);
  }

  createEmptyWalletLink(params: EmptyWalletParams): CreateLinkResult {
    return createLink(this.basePath, BedrockCore.Paths.EmptyWallet, params);
  }

  async createAuthorizationNonceLink(params: AuthorizationParams): Promise<CreateNonceLinkResult> {
    return await createNonceLink(
      this.basePath,
      BedrockCore.Paths.Authorization,
      BedrockCore.Paths.AuthorizationNonce,
      params,
    );
  }
}
