import React from 'react';
import { Action, CreateLinkResult } from '@bedrock-foundation/sdk';

export function useCreateLink<T>(action: Action<T, any>, params: T): CreateLinkResult {
  return React.useMemo(
    () => action.createLink(params),
    [action, params],
  );
}
