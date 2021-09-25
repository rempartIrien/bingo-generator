import React from 'react';

import { shuffleArray, toGrid } from './random.util';

interface BingoViewerProps {
  title: string;
  labels: string[];
  rowNumber: number;
  columnNumber: number;
}

function BingoViewer(props: BingoViewerProps): JSX.Element {
  if (!isNumberValid(props.rowNumber) || !isNumberValid(props.columnNumber)) {
    return <p>Can&apos;t generate bingo, please check your parameters.</p>;
  }
  const randomizedStuff: string[][] = toGrid(
    shuffleArray(props.labels),
    props.rowNumber,
    props.columnNumber
  );

  return (
    <>
      <h2>{props.title}</h2>
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
    </>
  );
}

function isNumberValid(value: number): boolean {
  return !!(value || value === 0);
}

export default BingoViewer;
