import React from 'react';
import {
  CreateNonceLinkResult,
} from '@bedrock-foundation/sdk';

type UseCreateNonceLinkConfig<T> = {
  onComplete?: (result: CreateNonceLinkResult) => void,
  onError?: (error: Error) => void,
  onCancel?: () => void,
  params: T;
};

type UseCreateNonceLink = {
  result: CreateNonceLinkResult | null;
  loading: boolean;
  error: Error | null;
  cancel: () => void;
}

export function useCreateNonceLink<T>(
  createNonceLink: (params: T) => Promise<CreateNonceLinkResult>,
  config: UseCreateNonceLinkConfig<T> = { params: {} as T },
): UseCreateNonceLink {
  const [result, setResult] = React.useState<CreateNonceLinkResult | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [isPolling, setIsPolling] = React.useState<boolean>(true);
  const cancel = React.useCallback((broadcast: boolean = true) => {
    setIsPolling(false);
    if (broadcast) {
      config?.onCancel?.();
    }
  }, [isPolling]);

  React.useEffect(() => {
    const doEffect = async () => {
      try {
        setLoading(true);
        const result = await createNonceLink(config.params);
        setLoading(false);
        setResult(result);
        config?.onComplete?.(result);
        cancel(false);
      } catch (e: any) {
        setLoading(false);
        console.error(e);
        setError(e as Error);
        config?.onError?.(e as Error);
        cancel(false);
      }
    };
    doEffect();
  }, [JSON.stringify(config.params)]);

  return {
    result,
    loading,
    error,
    cancel,
  };
}
