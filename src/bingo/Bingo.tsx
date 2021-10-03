import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { decode } from '../base64.utils';

import BingoViewer from './BingoViewer';

function Bingo(): JSX.Element {
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

  if (!decryptedContext) {
    return <p>Too bad</p>; // FIXME: link to generator page
  }

  return (
    <BingoViewer
      title={decryptedContext.title as string}
      labels={decryptedContext.labels as string[]}
      size={decryptedContext.size as number}></BingoViewer>
  );
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

export default Bingo;
