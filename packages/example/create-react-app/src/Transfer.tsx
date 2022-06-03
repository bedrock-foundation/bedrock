import React from 'react';
import {
  Bedrock,
  TokenTypes,
  TransferParams,
  useCreateLink,
  usePollReferenceStatus,
} from "@bedrock-foundation/react-sdk";
import QRCode from 'react-qr-code';

const { core: { createTransferLink } } = new Bedrock('https://magically-production.ngrok.io');

function App() {
  const [signature, setSignature] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [canceled, setCanceled] = React.useState<boolean>(false);

  const [transferParams] = React.useState<TransferParams>({
    wallet: "Exxuw5WdrazbVLDs2g2A5zg2fJ9cZjwRM6mZaGD8Mnsx",
    size: 1,
    token: TokenTypes.USDC,
  });

  const {
    link, 
    refs: { 
      requestRef
    },
  } = useCreateLink(createTransferLink, transferParams);

  const { cancel } = usePollReferenceStatus(requestRef, {
    onComplete: (data: any) => {
      setSignature(data?.signature ?? null);
    },
    onError: setError,
    onCancel: () => setCanceled(true),
    interval: 5000,
  });

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

export default App;
