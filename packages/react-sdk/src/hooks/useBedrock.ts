import React from 'react';
import {
  Bedrock,
} from '@bedrock-foundation/sdk';

export function useBedrock(url?: string): Bedrock {
  return React.useMemo(
    () => new Bedrock(url),
    [url],
  );
}
