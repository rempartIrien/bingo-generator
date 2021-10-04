import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { decode } from './base64.utils';

export interface Context {
  context: string | null;
  decryptedContext: Record<string, unknown> | undefined;
}

export function useUrlContext(): Context {
  const [decryptedContext, setDecryptedContext] =
    useState<Record<string, unknown>>();
  const context: string | null = useQueryContext();

  useEffect(() => {
    if (context) {
      setDecryptedContext(JSON.parse(decode(context)));
    } else {
      setDecryptedContext(void 0);
    }
  }, [context]);

  return { context, decryptedContext };
}

/**
 * Hook from react router documenation that return the search part
 * of the current URL. It is based on `useLocation` hook.
 *
 * See https://reactrouter.com/web/example/query-parameters
 */
function useQueryContext(): string | null {
  return new URLSearchParams(useLocation().search).get('context');
}
