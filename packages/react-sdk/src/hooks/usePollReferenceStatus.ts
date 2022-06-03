import React from 'react';
import { useInterval } from './useInterval';

type UsePollReferenceStatusParams = {
  onComplete?: (data: any) => void,
  onError?: (error: Error) => void,
  onCancel?: () => void,
  interval: number;
}

type UsePollReferenceStatus = {
  data: any | null;
  error: Error | null;
  cancel: () => void;
}

const DEFAULT_INTERVAL = 5000;

export function usePollReferenceStatus(ref: string, params: UsePollReferenceStatusParams): UsePollReferenceStatus {
  const [data, setData] = React.useState<any | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isPolling, setIsPolling] = React.useState<boolean>(true);
  // const { pollReferenceStatus } = React.useMemo(() => params.bedrock, [params.bedrock]);
  const cancel = React.useCallback((broadcast: boolean = true) => {
    setIsPolling(false);
    if (broadcast) {
      params?.onCancel?.();
    }
  }, [isPolling]);

  useInterval(
    async () => {
      try {
        // const data: any = await pollReferenceStatus.status({ ref: params.ref });
        const data: any = {};
        if (data.signature !== null) {
          setData(data);
          params?.onComplete?.(data);
          cancel(false);
        }
      } catch (e: any) {
        console.error(e);
        setError(e as Error);
        params?.onError?.(e as Error);
        cancel(false);
      }
    },
    params.interval ?? DEFAULT_INTERVAL,
    isPolling,
  );

  return {
    data,
    error,
    cancel,
  };
}
