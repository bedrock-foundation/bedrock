import React from 'react';
import {
  Bedrock,
  useCreateNonceLink,
  useNonceSocket,
  QRCode,
} from "@bedrock-foundation/react-sdk";

const bedrock = new Bedrock("https://magically-production.ngrok.io");

const { authorization } = bedrock;

function App() {
  const [signature, setSignature] = React.useState<string | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [canceled, setCanceled] = React.useState<boolean>(false);

  const {
    result,
  } = useCreateNonceLink(authorization, {
    params: {},
    onComplete: (result) => {
      console.log(result);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data } = useNonceSocket({
    nonce: (result as any)?.nonce, 
    onComplete: (data: any) => {
      // setSignature(data?.signature ?? null);
    },
    onError: setError,
    bedrock,
  });


  return (
    <div>
      <QRCode value={result?.link ?? ""} size={256} />
      {signature
        ? `Transaction Signature: ${signature}`
        : "Waiting for confirmation..."}
      {error && `There was an error confirming the transaction: ${error}`}
      {canceled && `Transaction confirmation polling was canceled.`}
    </div>
  );
}

export default App;
