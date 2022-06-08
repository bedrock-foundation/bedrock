import {
  createLink,
  createNonceLink,
  CreateLinkResult,
  CreateNonceLinkResult,
  LinkCreatorParams,
  BaseTransactionRequestParams,
} from '../models/createLink';
import { TokenTypes, TransactionStatuses } from '../models/shared';

export interface TokenGate {
  collectionId?: string;
  firstCreatorId?: string;
  updateAuthorityId?: string;
  traits?: Record<string, string | number>
  discountPercentage?: number;
}

export interface TokenDataSummary {
  name: string;
  mint: string;
  image?: string;
  traits: Record<string, string | number>;
}

export type TransferParams = {
  wallet: string;
  token?: TokenTypes;
  tokenAddress?: string;
  quantity?: number;
  size?: number;
  gate?: TokenGate;
} & BaseTransactionRequestParams;

export type EmptyWalletParams = {} & BaseTransactionRequestParams;

export type AuthorizationParams = {
  gate?: TokenGate;
} & BaseTransactionRequestParams;

export type AuthorizationData = {
  wallet: string;
  status: TransactionStatuses,
  signature: string | null,
  token: string | null,
  message?: string;
  gate?: TokenDataSummary;
}

export type GetReferenceStatusParams = {
  ref: string;
};

export type StatusData = {
  status: TransactionStatuses;
  signature?: string | null
  message?: string | null;
}

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

  createTransferLink = (params: TransferParams): CreateLinkResult => {
    return createLink<TransferParams>(this.basePath, BedrockCore.Paths.Transfer, params);
  }

  createEmptyWalletLink = (params: EmptyWalletParams): CreateLinkResult => {
    return createLink<EmptyWalletParams>(this.basePath, BedrockCore.Paths.EmptyWallet, params);
  }

  createAuthorizationNonceLink = async (params: AuthorizationParams): Promise<CreateNonceLinkResult> => {
    return await createNonceLink<AuthorizationParams>(
      this.basePath,
      BedrockCore.Paths.Authorization,
      BedrockCore.Paths.AuthorizationNonce,
      params,
    );
  }

  getReferenceStatus = async (params: GetReferenceStatusParams): Promise<StatusData> => {
    const { ref } = params;
    const url = `${this.basePath}${BedrockCore.Paths.ReferenceStatus}?ref=${ref}`;
    const response = await fetch(url);
    return await response.json();
  }
}
