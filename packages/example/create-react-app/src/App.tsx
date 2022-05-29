import React from 'react';
import './App.css';
import {
  Bedrock,
  StatusResultData,
  TokenTypes,
  TransferParams,
  useCreateLink,
  usePollReferenceStatus,
} from "@bedrock-foundation/react-sdk";
import QRCode from "react-qr-code";

const bedrock = new Bedrock();

const { transfer } = bedrock;

function App() {
  const [signature, setSignature] = React.useState<string | null>(null);

  const [transferParams] = React.useState<TransferParams>({
    wallet: "Exxuw5WdrazbVLDs2g2A5zg2fJ9cZjwRM6mZaGD8Mnsx",
    size: 1,
    token: TokenTypes.USDC,
  });

  const {
    link, refs: { requestRef },
  } = useCreateLink(transfer, transferParams);

  const { data, error, cancel } = usePollReferenceStatus({
    ref: requestRef,
    onComplete: (data: StatusResultData) => {
      setSignature(data?.signature ?? null);
    },
    onError: (error: Error) => {
      console.log("HIT onError", error);
    },
    onCancel: () => {
      console.log("HIT onCancel");
    },
    bedrock,
  });


  return (
    <div className="App">
      <header className="App-header">
        <QRCode value={link} size={256} />
        {signature ? `Transaction Signature: ${signature}` : "Waiting for confirmation..."}
        <div onClick={() => cancel()}>Cancel</div>
      </header>
    </div>
  );
}

export default App;
