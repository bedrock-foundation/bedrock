import express, { Application } from 'express';
import compression from 'compression';
import { json } from 'body-parser';
import {
  TransferRouter,
  EmptyWalletRouter,
  PollReferenceRouter,
} from '@bedrock-foundation/server';

function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

class App {
  public app: Application;

  public server: any;

  public port: number;

  public routers: {router: express.router} [];

  constructor(port: number, routers: {router: express.Router}[]) {
    this.app = express();
    this.port = port;
    this.routers = routers;

    this.initializeMiddlewares();
    this.initializeHTTP();
  }

  private initializeMiddlewares() {
    this.app.use(compression());
    this.app.use(cors);
    this.app.use(json());
  }

  private initializeHTTP() {
    this.routers.forEach((router) => {
      this.app.use(router.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

new App(3001, [
  new TransferRouter(),
  new EmptyWalletRouter(),
  new PollReferenceRouter(),
]).listen();
