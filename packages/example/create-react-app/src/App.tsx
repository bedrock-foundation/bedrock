import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Bedrock, TokenTypes, TransferParams } from "@bedrock-foundation/sdk";
import QRCode from "react-qr-code";
import styles from "../styles/Home.module.css";

const { transfer, pollReferenceStatus } = new Bedrock(
  "https://magically-production.ngrok.io"
);

function App() {
  const transferParams = React.useMemo(() => {
    return {
      wallet: "Exxuw5WdrazbVLDs2g2A5zg2fJ9cZjwRM6mZaGD8Mnsx",
      size: 1,
      payerToken: TokenTypes.USDC,
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

  React.useEffect(() => {
    const doEffect = async () => {
      const { signature } = await pollReferenceStatus.status({
        ref: requestRef,
        interval: 10000,
        maxRetries: 100,
      });
      console.log(signature);
    };
    doEffect();
  });


  return (
    <div className="App">
      <header className="App-header">
        <QRCode value={link} size={256} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
