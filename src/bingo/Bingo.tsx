import React from 'react';

import { useUrlContext } from '../url-context.hook';

import BingoViewer from './BingoViewer';

function Bingo(): JSX.Element {
  const decryptedContext: Record<string, unknown> | undefined = useUrlContext();

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

export default Bingo;
