import io from 'socket.io-client';
import React from 'react';
import {
  createNonceSocketTopic,
} from '@bedrock-foundation/sdk';

type UseNonceSocketConfig<T> = {
  nonce: string | null
  onChange?: (data: T) => void,
  onError?: (error: Error) => void,
};

type UseNonceSocket<T> = {
  data: T | null;
  error: Error | null;
};

export function useNonceSocket<T>(config: UseNonceSocketConfig<T>): UseNonceSocket<T> {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (config.nonce) {
      const newSocket = io('http://localhost:3001');
      const nonceSocketTopic = createNonceSocketTopic(config.nonce);

      newSocket.on('connect', () => {
        newSocket.on(nonceSocketTopic, (data: T) => {
          setData(data);
          config.onChange?.(data);
        });
        newSocket.once('error', (error: Error) => {
          setError(error);
          config?.onError?.(error);
        });
      });

      return () => {
        newSocket.close();
      };
    }
    return () => {};
  }, [config.nonce]);

  return {
    data,
    error,
  };
}
