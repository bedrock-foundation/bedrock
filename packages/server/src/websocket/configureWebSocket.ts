import { Server } from 'http';
import { RedisClientType } from 'redis';
import { Server as SocketServer } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';

export const configureWebSocket = async (server: Server, redis: RedisClientType): Promise<SocketServer> => {
  const io = new SocketServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'POST', 'DELETE'],
    },
  });
  const subClient = redis.duplicate();
  await Promise.all([redis.connect(), subClient.connect()]);
  io.adapter(createAdapter(redis, subClient));
  return io;
};
