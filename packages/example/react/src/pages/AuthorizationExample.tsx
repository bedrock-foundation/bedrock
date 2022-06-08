import React from "react";
import {
  Bedrock,
  useCreateNonceLink,
  useNonceSocket,
  AuthorizationData,
} from "@bedrock-foundation/react-sdk";
import QRCode from "react-qr-code";

const {
  core: { createAuthorizationNonceLink },
} = new Bedrock("https://magically-production.ngrok.io");

function AuthorizationExample() {
  const [authData, setAuthData] = React.useState<AuthorizationData | null>(
    null
  );
  const [error, setError] = React.useState<Error | null>(null);

  const { result } = useCreateNonceLink(createAuthorizationNonceLink, {
    params: {
      gate: {
        collection: "SMBH3wF6baUj6JWtzYvqcKuj2XCKWDqQxzspY12xPND",
      },
    },
    onComplete: (result) => {
      console.log(result);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useNonceSocket<AuthorizationData>({
    nonce: result?.nonce ?? "",
    onChange: (data: AuthorizationData) => {
      console.log(data);
      setAuthData(data);
    },
    onError: setError,
  });

  return (
    <div>
      <QRCode value={result?.link ?? ""} size={256} />
      <p>{"Signature: " + (authData?.signature ?? "Pending")}</p>
      <p>{"Status: " + (authData?.status ?? "Waiting for scan...")}</p>
      <p>{"Scanned By: " + (authData?.wallet ?? "Waiting for scan...")}</p>
      <p>{"Token: " + (authData?.token ?? "Waiting for confirmation...")}</p>
      {error && `There was an error confirming the transaction: ${error}`}
    </div>
  );
}

export default AuthorizationExample;
