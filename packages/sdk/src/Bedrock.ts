import { TransferAction } from './actions/transfer';
import { EmptyWalletAction } from './actions/emptyWallet';

export class Bedrock {
  private readonly basePath: string;

  public transfer: TransferAction;

  public emptyWallet: EmptyWalletAction;

  constructor(basePath?: string) {
    this.basePath = basePath ?? 'http://localhost:3000';

    this.transfer = new TransferAction(this.basePath);
    this.emptyWallet = new EmptyWalletAction(this.basePath);
  }
}
