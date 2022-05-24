# Bedrock
Bedrock is a suite of tools for Solana Pay that:

- Standardizes the methodology used to create transaction requests
- Provides implementations for many popular on-chain programs (SystemProgram, SPL, and others)
- Provides tools to write custom Solana Pay programs
- Provides client-side SDK's in many popular programming languages

Bedrock is comprised of two core components: a server-side HTTP server, and a client-side SDK. 

## Official Bedrock Docs and Guide

You can check out our docs at https://docs.bedrock.fyi/

## Quickstart Guide

### Installing

Install the SDK in your project via NPM.
```bash
$ npm install --save @bedrock-foundation/sdk
```

### Usage
In your front-end or back-end, import and initalize the SDK.
```ts
import {
  Bedrock, TokenTypes, TransferParams,
} from '@bedrock-foundation/sdk';

const { transfer } = new Bedrock();
```
Create a transfer link and get a referene to track the transaction later
```.ts
const [transferParams] = React.useState<TransferParams>({
  wallet: 'Exxuw5WdrazbVLDs2g2A5zg2fJ9cZjwRM6mZaGD8Mnsx',
  size: 1,
  payerToken: TokenTypes.USDC,
});

const { link, res }: { string, string }transfer.createLink(transferParams)
```







## Community

We have a few channels for contact:

- [Discord](https://discord.gg/on_bedrock)
- [@on_bedrock](https://twitter.com/on_bedrock) on Twitter
- [GitHub Issues](https://github.com/bedrock-foundation/bedrock/issues)


## Reporting security issues

To report a security issue, please follow the guidance on the [SECURITY](.github/SECURITY.md) page.
