import { Connection } from '@solana/web3.js';
import { SOLANA_RPC_ENDPOINT } from '../env';

const RPCConnection = new Connection(
  SOLANA_RPC_ENDPOINT,
  'confirmed',
);

export default RPCConnection;
