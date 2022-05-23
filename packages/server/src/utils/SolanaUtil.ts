import {
  PublicKey, Keypair, Connection, TransactionInstruction,
} from '@solana/web3.js';
import * as spl from '@solana/spl-token';
import fs from 'fs-extra';
import RPCConnection from './RPCConnection';

const keyPairFromFile = async (filePath: string): Promise<Keypair> => {
  const file = await fs.readFile(filePath, 'utf8');
  const json = JSON.parse(file);
  return Keypair.fromSecretKey(new Uint8Array(json.key));
};

const printTokenAccounts = async (connection: Connection, publicKey: PublicKey, label: string): Promise<void> => {
  const tokenAccounts = await connection.getTokenAccountsByOwner(
    publicKey,
    {
      programId: spl.TOKEN_PROGRAM_ID,
    },
  );
  console.log('\n\n');
  console.log(`For key ${label} ${publicKey}`);
  console.log('Token                                         Balance');
  console.log('------------------------------------------------------------');
  tokenAccounts.value.forEach((e) => {
    const accountInfo = spl.AccountLayout.decode(e.account.data);
    console.log(`${new PublicKey(accountInfo.mint)}   ${accountInfo.amount}`);
  });
  console.log('\n\n');
};

const getRandomNFTMintFromAccount = async (connection: Connection, account: PublicKey): Promise<PublicKey> => {
  const { value } = await connection.getTokenAccountsByOwner(
    account,
    {
      programId: spl.TOKEN_PROGRAM_ID,
    },
  );

  const nfts = value.filter((accountData) => {
    const accountInfo = spl.AccountLayout.decode(accountData.account.data);
    return accountInfo.amount === BigInt(1);
  });

  const nft = nfts[Math.floor(Math.random() * nfts.length)];

  return spl.AccountLayout.decode(nft.account.data).mint;
};

const calculatePlatformFee = (amountInSol: number): number => amountInSol * 0.01;

const calculateMerchantFee = (amountInSol: number): number => amountInSol - calculatePlatformFee(amountInSol);

const getTokenAccountBalance = async (connection: Connection, ataPublicKey: PublicKey): Promise<BigInt> => {
  const what = await connection.getTokenAccountBalance(ataPublicKey);
  console.log(what);

  return BigInt(1);
};

export interface TransferSplTokensParams {
  transfers: TransferSplTokenParams[];
  validateFunds?: boolean;
}
const transferTokens = async (params: TransferSplTokensParams): Promise<TransactionInstruction[]> => {
  const { transfers } = params;

  /**
   * TODO: Talk with wallets about error handling
   *
   * The code below is for validating the balances
   * of each sending wallet before create the transactions
   * as the wallets will fail the transactions if the required
   * balance is not available.
   *
   * Unfortunately, there is no way to send an error message
   * to the wallet client letting them know that they do not have
   * the required funds.
   */

  // const transferAmount: Record<string, number> = transfers.reduce((cur, transfer) => {
  //   const key = `${transfer.fromAccountPublicKey.toString()}:${transfer.splTokenPublicKey.toString()}`;
  //   if(cur.hasOwnProperty(key)) {
  //     cur[key] += transfer.amount;
  //   } else {
  //     cur[key] = transfer.amount;
  //   }
  //   return cur;
  // }, {});

  // Object.keys(transferAmount).map(async (key) => {
  //   const parts = key.split(':');
  //   const fromAccountPublicKey = new PublicKey(parts[0]);
  //   const splTokenPublicKey = new PublicKey(parts[1]);
  //   const amount = transferAmount[key];

  //   const ata = await spl.getAssociatedTokenAddress(
  //     splTokenPublicKey,
  //     fromAccountPublicKey,
  //     false,
  //     spl.TOKEN_PROGRAM_ID,
  //     spl.ASSOCIATED_TOKEN_PROGRAM_ID,
  //   );

  //   const { value: { amount: balance } } = await RPCConnection.getTokenAccountBalance(ata)

  //   if (BigInt(balance) < BigInt(amount)) {
  //     throw new Error(`Not enough balance to transfer ${amount}`);
  //   }
  // });

  const createAtaAndTransferIxs: TransactionInstruction[][] = await Promise.all(
    transfers.map(transferToken),
  );

  return createAtaAndTransferIxs.flat();
};

export interface TransferSplTokenParams {
  fromAccountPublicKey: PublicKey;
  toAccountPublicKey: PublicKey;
  splTokenPublicKey: PublicKey;
  amount: number;
  feePayerPublicKey: PublicKey;
  refs: PublicKey[];
}

const transferToken = async (params: TransferSplTokenParams): Promise<TransactionInstruction[]> => {
  const {
    fromAccountPublicKey,
    toAccountPublicKey,
    splTokenPublicKey,
    amount,
    feePayerPublicKey,
    refs,
  } = params;

  const transferIxs = [];

  const toAccountAtaPublicKey = await spl.getAssociatedTokenAddress(
    splTokenPublicKey,
    toAccountPublicKey,
    false,
    spl.TOKEN_PROGRAM_ID,
    spl.ASSOCIATED_TOKEN_PROGRAM_ID,
  );

  const account = await RPCConnection.getAccountInfo(toAccountAtaPublicKey);

  if (account === null) {
    const createAtaIx = spl.createAssociatedTokenAccountInstruction(
      feePayerPublicKey,
      toAccountAtaPublicKey,
      toAccountPublicKey,
      splTokenPublicKey,
      spl.TOKEN_PROGRAM_ID,
      spl.ASSOCIATED_TOKEN_PROGRAM_ID,
    );

    transferIxs.push(createAtaIx);
  }

  const fromAccountAtaPublicKey = await spl.getAssociatedTokenAddress(
    splTokenPublicKey,
    fromAccountPublicKey,
    false,
    spl.TOKEN_PROGRAM_ID,
    spl.ASSOCIATED_TOKEN_PROGRAM_ID,
  );

  const transferIx = spl.createTransferInstruction(
    fromAccountAtaPublicKey,
    toAccountAtaPublicKey,
    fromAccountPublicKey,
    amount,
  );

  refs.forEach((ref) => {
    transferIx.keys.push({ pubkey: ref, isWritable: false, isSigner: false });
  });

  transferIxs.push(transferIx);

  return transferIxs;
};

const SolanaUtil = {
  keyPairFromFile,
  printTokenAccounts,
  getRandomNFTMintFromAccount,
  calculatePlatformFee,
  calculateMerchantFee,
  getTokenAccountBalance,
  transferTokens,
  transferToken,
};

export default SolanaUtil;
