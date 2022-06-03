import { Server } from 'http';
import express, { Application } from 'express';
import compression from 'compression';
import { json } from 'body-parser';
import {
  TransferRouter,
  EmptyWalletRouter,
  GetReferenceStatusRouter,
  AuthorizationRouter,
  configureWebSocket,
} from '@bedrock-foundation/server';
import { createClient, RedisClientType } from 'redis';

function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

type AppParams = {
  port: number;
}

class App {
  public app: Application;

  public server: Server;

  public port: number;

  public routers: {router: express.router} [];

  constructor(params: AppParams) {
    this.app = express();
    this.configureMiddleware();
    this.server = new Server(this.app);
    this.configureRouters();
    this.port = params.port;
  }

  private configureMiddleware() {
    this.app.use(compression());
    this.app.use(cors);
    this.app.use(json());
  }

  private async configureRouters() {
    const redis: RedisClientType = createClient();
    redis.on('error', (err) => console.log('Redis Client Error', err));
    redis.on('connect', () => console.log('Redis Client Connected'));
    await redis.connect();
    const io = configureWebSocket(this.server);
    [
      new TransferRouter(),
      new EmptyWalletRouter(),
      new GetReferenceStatusRouter({ logger: console }),
      new AuthorizationRouter({ redis, io }),
    ].forEach((router) => {
      this.app.use(router.router);
    });
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

new App({
  port: 3001,
}).listen();
