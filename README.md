<p align="center">
  <a href="https://bedrock.fyi">
    <img alt="Bedrock Foundation" src="packages/marketing/public/bedrock-logo.png" style="background: black; padding: 10px" width="150" />
  </a>
</p>

# Bedrock
Bedrock is a suite of tools for Solana Pay that:

- Standardizes the methodology used to create transaction requests
- Provides implementations for many popular on-chain programs (SystemProgram, SPL, and others)
- Provides tools to write custom Solana Pay programs
- Provides client-side SDK's in many popular programming languages

Bedrock is comprised of two core components: a server-side HTTP server, and a client-side SDK. 

## Documentation
The documentation for this project is currently a WIP. A quickstart guide can be found below for those interested in using Bedrock in their React applications. Examples for server configuration can be found [here](https://github.com/bedrock-foundation/bedrock/tree/master/packages/example/express). Please check back soon for more in-depth guides on using Bedrock, or reach out to sam@bedrock.fyi for more information.

### Additional Resources

- [Solana Pay Documentation](https://docs.solanapay.com/)
- [Solana Pay Transaction Request Spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#specification-transaction-request)

NOTE: It is a good idea to familiarize yourself with the concepts described in the [Solana Pay Transaction Request Spec](https://github.com/solana-labs/solana-pay/blob/master/SPEC.md#specification-transaction-request) before reading on.


## Quickstart Guide

### Installing

Install the SDK in your React project via NPM
```bash
$ npm install --save @bedrock-foundation/react-sdk
```

### Usage
Import and initalize the SDK.
```ts
import React from 'react';
import {
  Bedrock,
  StatusResultData,
  TokenTypes,
  TransferParams,
  useCreateLink,
  usePollReferenceStatus,
  QRCode,
} from "@bedrock-foundation/react-sdk";

const bedrock = new Bedrock();

const { transfer } = bedrock;
```
Create variables to store state about the transaction. Then create a transfer request link and get a reference to track the transaction later. In this example, we are transfering 1 USDC from the initiating wallet to the public key represents by the `wallet` parameter. Finally, we render a QR code and some details about the transaction to the user.
```.ts
function App() {
  // React state to store information about the transaction
  const [signature, setSignature] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [canceled, setCanceled] = React.useState<boolean>(false);

  // Create the transfer params
  const [transferParams] = React.useState<TransferParams>({
    wallet: "Exxuw5WdrazbVLDs2g2A5zg2fJ9cZjwRM6mZaGD8Mnsx",
    size: 1,
    token: TokenTypes.USDC,
  });

  // Create the reqeuest link and get a reference to the transaction
  const {
    link, refs: { requestRef },
  } = useCreateLink(transfer, transferParams);

  // Start polling for the status of the newly created transaction
  const { cancel } = usePollReferenceStatus({
    ref: requestRef,
    onComplete: (data: StatusResultData) => {
      setSignature(data?.signature ?? null);
    },
    onError: setError,
    onCancel: () => setCanceled(true),
    bedrock,
  });

  // Render UI to user to scan QR code and get updates on transaction status
  return (
    <div>
      <QRCode value={link} size={256} />
      {signature
        ? `Transaction Signature: ${signature}`
        : "Waiting for confirmation..."}
      {error && `There was an error confirming the transaction: ${error}`}
      {canceled && `Transaction confirmation polling was canceled.`}
      <div onClick={() => cancel()}>Cancel</div>
    </div>
  );
}
```
The link returned is a string representing a Solana Pay Transaction Request HTTP endpoint on the Bedrock servers.

## Community

We have a few channels for contact:

- [Discord](https://discord.gg/qDJm4GP5)
- [@on_bedrock](https://twitter.com/on_bedrock) on Twitter
- [GitHub Issues](https://github.com/bedrock-foundation/bedrock/issues)


## Reporting security issues

To report a security issue, please follow the guidance on the [SECURITY](SECURITY.md) page.
