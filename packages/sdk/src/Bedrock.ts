import { TransferAction } from './actions/TransferAction';
import { EmptyWalletAction } from './actions/EmptyWalletAction';
import { PollReferenceStatus } from './status/PollReferenceStatus';

export class Bedrock {
  public readonly basePath: string;

  public transfer: TransferAction;

  public emptyWallet: EmptyWalletAction;

  public pollReferenceStatus: PollReferenceStatus;

  constructor(basePath?: string) {
    this.basePath = basePath ?? 'https://pay.bedrock.fyi';
    /**
     * Actions
     */

    this.transfer = new TransferAction(this.basePath);
    this.emptyWallet = new EmptyWalletAction(this.basePath);

    /**
     * Status
     */

    this.pollReferenceStatus = new PollReferenceStatus(this.basePath);
  }
}
