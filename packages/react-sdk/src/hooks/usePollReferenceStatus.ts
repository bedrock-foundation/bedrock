import React from 'react';
import {
  StatusResultData, Bedrock, PollReferenceStatusParams,
} from '@bedrock-foundation/sdk';
import { useInterval } from './useInterval';

type UsePollReferenceStatusParams = {
  onComplete?: (data: StatusResultData) => void,
  onError?: (error: Error) => void,
  onCancel?: () => void,
  bedrock: Bedrock,
} & PollReferenceStatusParams;

type UsePollReferenceStatus = {
  data: StatusResultData | null;
  error: Error | null;
  cancel: () => void;
}

const DEFAULT_INTERVAL = 5000;

export function usePollReferenceStatus(params: UsePollReferenceStatusParams): UsePollReferenceStatus {
  const [data, setData] = React.useState<StatusResultData | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isPolling, setIsPolling] = React.useState<boolean>(true);
  const { pollReferenceStatus } = React.useMemo(() => params.bedrock, [params.bedrock]);
  const cancel = React.useCallback((broadcast: boolean = true) => {
    setIsPolling(false);
    if (broadcast) {
      params?.onCancel?.();
    }
  }, [isPolling]);

  useInterval(
    async () => {
      try {
        const data = await pollReferenceStatus.status({ ref: params.ref });
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
