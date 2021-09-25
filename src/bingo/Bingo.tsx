import React from 'react';

import BingoViewer from './BingoViewer';

const HARD_CODED_STUFF: string[] = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
];

function Bingo(): JSX.Element {
  return (
    <BingoViewer
      labels={HARD_CODED_STUFF}
      rowNumber={3}
      columnNumber={3}></BingoViewer>
  );
}

export default Bingo;
