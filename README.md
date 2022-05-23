# Bedrock
Bedrock is a suite of tools for Solana Pay that:

- Standardizes the methodology used to create transaction requests
- Provides implementations for many popular on-chain programs (SystemProgram, SPL, and others)
- Provides tools to write custom Solana Pay programs
- Provides client-side SDK's in many popular programming languages

Bedrock is comprised of two core components: a server-side HTTP server, and a client-side SDK. 

## Official Bedrock Docs and Guide

You can check out our docs at https://docs.bedrock.fyi/

## Installing

Clone the repo, and run `yarn start` to deploy.

```bash
$ git clone https://github.com/bedrock-foundation/bedrock.git
$ cd bedrock
$ lerna bootstrap
$ lerna run dev --parallel
```

## Community

We have a few channels for contact:

- [Discord](https://discord.gg/on_bedrock)
- [@onbedrock](https://twitter.com/on_bedrock) on Twitter
- [GitHub Issues](https://github.com/bedrock-foundation/bedrock/issues)


## Reporting security issues

To report a security issue, please follow the guidance on the [SECURITY](.github/SECURITY.md) page.
