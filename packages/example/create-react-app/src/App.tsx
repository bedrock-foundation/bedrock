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
    link, refs: { requestRef },
  } = useCreateLink(transfer, transferParams);

  const { cancel } = usePollReferenceStatus({
    ref: requestRef,
    onComplete: (data: StatusResultData) => {
      setSignature(data?.signature ?? null);
    },
    onError: setError,
    onCancel: () => setCanceled(true),
    bedrock,
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
