import React from 'react';
import './App.css';
import { Bedrock, TokenTypes, TransferParams } from "@bedrock-foundation/sdk";
import QRCode from "react-qr-code";

const { transfer, pollReferenceStatus } = new Bedrock(
  "https://magically-production.ngrok.io"
);

function App() {
  const [signature, setSignature] = React.useState<string | null>(null);

  const transferParams: TransferParams = React.useMemo(() => {
    return {
      wallet: "Exxuw5WdrazbVLDs2g2A5zg2fJ9cZjwRM6mZaGD8Mnsx",
      size: 1,
      token: TokenTypes.USDC,
    };
  }, []);

  const result = React.useMemo(
    () => transfer.createLink(transferParams),
    [transferParams]
  );

  const {
    link,
    refs: { requestRef },
  } = result;


  console.log(link);

  React.useEffect(() => {
    const doEffect = async () => {
      const { signature } = await pollReferenceStatus.status({
        ref: requestRef,
        interval: 10000,
        maxRetries: 100,
      });

      setSignature(signature ?? null);

    };
    doEffect();
  });

  return (
    <div className="App">
      <header className="App-header">
        <QRCode value={link} size={256} />
        {signature ? `Transaction Signature: ${signature}` : "Waiting for confirmation..."}
      </header>
    </div>
  );
}

export default App;
