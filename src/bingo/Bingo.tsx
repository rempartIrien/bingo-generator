import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Context, useUrlContext } from '../url-context.hook';

import BingoViewer from './BingoViewer';

function Bingo(): JSX.Element {
  const { context, decryptedContext }: Context = useUrlContext();
  const search: string = useMemo(
    () => (context ? `context=${context}` : ''),
    [context]
  );

  if (!decryptedContext) {
    return <p>Too bad</p>; // FIXME: link to generator page
  }

  return (
    <>
      <Link to={{ pathname: '/generator', search }}>Edit this bingo</Link>
      <BingoViewer
        title={decryptedContext.title as string}
        labels={decryptedContext.labels as string[]}
        size={decryptedContext.size as number}></BingoViewer>
    </>
  );
}

export default Bingo;
