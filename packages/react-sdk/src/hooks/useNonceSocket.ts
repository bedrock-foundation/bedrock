import io from 'socket.io-client';
import React from 'react';
import {
  createNonceSocketTopic,
} from '@bedrock-foundation/sdk';

type UseNonceSocketParams<T> = {
  nonce: string | null
  onChange?: (data: T) => void,
  onError?: (error: Error) => void,
};

type UseNonceSocket<T> = {
  data: T | null;
  error: Error | null;
};

export function useNonceSocket<T>(params: UseNonceSocketParams<T>): UseNonceSocket<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (params.nonce) {
      const newSocket = io('http://localhost:3001');
      const nonceTopic = createNonceSocketTopic(params.nonce);

      newSocket.on('connect', () => {
        newSocket.on(nonceTopic, (data: T) => {
          setData(data);
          params.onChange?.(data);
        });
        newSocket.once('error', (error: Error) => {
          setError(error);
          params?.onError?.(error);
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
