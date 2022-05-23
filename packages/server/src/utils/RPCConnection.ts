import { Connection } from '@solana/web3.js';
// import { SOLANA_RPC_ENDPOINT } from '../env';

const RPCConnection = new Connection(
  'https://solana-api.syndica.io/access-token/j8ZlHMcxVzTA5r5k51Q7WI4IrZB1ZURNMvjswD7U6NxpKUDUIIeHTHHnXogW8v2J/rpc',
  'confirmed',
);

export default RPCConnection;
