import React from 'react';
import { CreateLinkResult } from '@bedrock-foundation/sdk';

export function useCreateLink<T>(createLink: (params: T) => CreateLinkResult, params: T): CreateLinkResult {
  return React.useMemo(
    () => createLink(params),
    [createLink, params],
  );
}
