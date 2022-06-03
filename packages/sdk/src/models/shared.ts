export enum TransactionStatuses {
  Unknown = 'Unknown',
  Pending = 'Pending',
  Scanned = 'Scanned',
  Confirmed = 'Confirmed',
  Error = 'Error',
}

export const createNonceSocketTopic = (nonce: string): string => {
  return `nonce/${nonce}`;
};

export enum TokenTypes {
  SOL = 'SOL',
  USDC = 'USDC',
}

export const TokenInfo: Record<TokenTypes, object> = {
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
};
