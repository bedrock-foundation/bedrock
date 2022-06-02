import { BedrockCore } from './modules/BedrockCore';

export class Bedrock {
  public readonly basePath: string;

  public core: BedrockCore;

  constructor(basePath?: string) {
    this.basePath = basePath ?? 'https://pay.bedrock.fyi';
    /**
     * modules
     */

    this.core = new BedrockCore({ basePath: this.basePath });
  }
}
