// import React from 'react';
import { Action, CreateLinkResult } from '@bedrock-foundation/sdk';

export function useCreateLink<T>(action: Action<T, any>, params: T): CreateLinkResult {
  // const result = React.useMemo(
  //   () => transfer.createLink(transferParams),
  //   [transferParams]
  // );
  console.log(action, params);
  return {
    link: '',
    refs: {
      requestRef: '',
    },
  };
}
