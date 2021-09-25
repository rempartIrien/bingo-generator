import React from 'react';

import { shuffleArray, toGrid } from './random.util';

interface BingoViewerProps {
  labels: string[];
  rowNumber: number;
  columnNumber: number;
}

function BingoViewer(props: BingoViewerProps): JSX.Element {
  const randomizedStuff: string[][] = toGrid(
    shuffleArray(props.labels),
    props.rowNumber,
    props.columnNumber
  );

  return (
    <table>
      <tbody>
        {randomizedStuff.map((array, index) => (
          <tr key={index}>
            {array.map((value, i) => (
              <td key={`${index}_${i}`}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BingoViewer;
