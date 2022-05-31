import io from 'socket.io-client';
import React from 'react';
import {
  StatusResultData,
  Bedrock,
  TransactionStatuses,
  createNonceStatusTopic,
} from '@bedrock-foundation/sdk';

type UseNonceSocketParams = {
  nonce: string | null
  onComplete?: (data: StatusResultData) => void,
  onError?: (error: Error) => void,
  bedrock: Bedrock,
};

type UseNonceSocket = {
  data: StatusResultData | null;
  error: Error | null;
};

export function useNonceSocket(params: UseNonceSocketParams): UseNonceSocket {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (params.nonce) {
      const newSocket = io('http://localhost:3001');
      const scannedTopic = createNonceStatusTopic(params.nonce, TransactionStatuses.Scanned);
      const confirmedTopic = createNonceStatusTopic(params.nonce, TransactionStatuses.Confirmed);
      const errorTopic = createNonceStatusTopic(params.nonce, TransactionStatuses.Error);

      newSocket.on('connect', () => {
        newSocket.once(scannedTopic, (data) => {
          console.log(data);
          setData(data);
        });
        newSocket.once(confirmedTopic, (data) => {
          console.log(data);
          setData(data);
        });
        newSocket.once(errorTopic, (data) => {
          console.log(data);
          setError(data);
        });
        newSocket.once('error', (data) => {
          console.log(data);
          setError(data);
        });
      });

      return () => {
        newSocket.close();
      };
    }
    return () => {};
  }, [params.nonce]);

  return {
    data,
    error,
  };
}
