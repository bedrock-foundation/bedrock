import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';

export const configureWebSocket = (server: Server): SocketServer => {
  return new SocketServer(server);
};
