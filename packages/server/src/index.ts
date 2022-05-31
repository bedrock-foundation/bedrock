import { Application } from 'express';

export * from './models/BaseActionRouter';
export * from './models/BaseStatusRouter';
export * from './routers/actions/TransferRouter';
export * from './routers/actions/EmptyWalletRouter';
export * from './routers/actions/AuthorizationRouter';
export * from './routers/status/PollReferenceRouter';
export * from './websocket/configureWebSocket';

// type BedrockServerParams = {
  
// };

// export const configureBedrockServer = (app: Application, ) => {

// };
