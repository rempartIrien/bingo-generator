import React from 'react';
import { useLocation } from 'react-router-dom';

import { decode } from '../base64.utils';

import BingoViewer from './BingoViewer';

function Bingo(): JSX.Element {
  const query: URLSearchParams = useQuery();
  if (!query.has('context') || !query.get('context')) {
    return <p>Too bad</p>; // FIXME: link to generator page
  }
  const context: string = query.get('context') as string;
  const decryptedContext: string = decode(context);
  console.log(decryptedContext);
  return <BingoViewer {...JSON.parse(decryptedContext)}></BingoViewer>;
}

/**
 * Hook from react router documenation that return the search part
 * of the current URL. It is based on `useLocation` hook.
 *
 * See https://reactrouter.com/web/example/query-parameters
 */
function useQuery(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}

export default Bingo;
