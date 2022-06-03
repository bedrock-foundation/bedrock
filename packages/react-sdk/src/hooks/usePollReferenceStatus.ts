import React from 'react';
import { GetReferenceStatusParams, StatusData } from '..';
import { useInterval } from './useInterval';

type UsePollReferenceStatusConfig = {
  ref: string;
  onComplete?: (data: any) => void,
  onError?: (error: Error) => void,
  onCancel?: () => void,
  interval?: number;
}

type UsePollReferenceStatus = {
  data: any | null;
  error: Error | null;
  cancel: () => void;
}

const DEFAULT_INTERVAL = 5000;

export function usePollReferenceStatus(
  getReferenceStatus: (params: GetReferenceStatusParams)=> Promise<StatusData>,
  config: UsePollReferenceStatusConfig,
): UsePollReferenceStatus {
  const [data, setData] = React.useState<StatusData | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isPolling, setIsPolling] = React.useState<boolean>(true);
  const cancel = React.useCallback((broadcast: boolean = true) => {
    setIsPolling(false);
    if (broadcast) {
      config?.onCancel?.();
    }
  }, [isPolling]);

  useInterval(
    async () => {
      try {
        const data: StatusData = await getReferenceStatus({ ref: config.ref });
        if (data.signature !== null) {
          setData(data);
          config?.onComplete?.(data);
          cancel(false);
        }
      } catch (e: any) {
        console.error(e);
        setError(e as Error);
        config?.onError?.(e as Error);
        cancel(false);
      }
    },
    config.interval ?? DEFAULT_INTERVAL,
    isPolling,
  );

  return {
    data,
    error,
    cancel,
  };
}
