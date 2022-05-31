import React from 'react';
import {
  CreateLinkResult,
} from '@bedrock-foundation/sdk';

type UseCreateNonceLinkConfig = {
  onComplete?: (data: CreateLinkResult) => void,
  onError?: (error: Error) => void,
  onCancel?: () => void,
  params: any;
};

type UseCreateNonceLink = {
  result: CreateLinkResult | null;
  error: Error | null;
  cancel: () => void;
}

export function useCreateNonceLink(action: any, params: UseCreateNonceLinkConfig): UseCreateNonceLink {
  const [result, setResult] = React.useState<CreateLinkResult | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isPolling, setIsPolling] = React.useState<boolean>(true);
  const cancel = React.useCallback((broadcast: boolean = true) => {
    setIsPolling(false);
    if (broadcast) {
      params?.onCancel?.();
    }
  }, [isPolling]);

  React.useEffect(() => {
    const doEffect = async () => {
      try {
        const result = await action.createNonceLink(params.params);
        setResult(result);
        params?.onComplete?.(result);
        cancel(false);
      } catch (e: any) {
        console.error(e);
        setError(e as Error);
        params?.onError?.(e as Error);
        cancel(false);
      }
    };
    doEffect();
  }, []);

  return {
    result,
    error,
    cancel,
  };
}
