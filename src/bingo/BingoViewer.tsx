import React from 'react';

import { shuffleArray, toGrid } from './random.util';

interface BingoViewerProps {
  title: string;
  labels: string[];
  size: number;
}

function BingoViewer(props: BingoViewerProps): JSX.Element {
  if (!isNumberValid(props.size) || !Array.isArray(props.labels)) {
    return <p>Can&apos;t generate bingo, please check your parameters.</p>;
  }
  const randomizedStuff: string[][] = toGrid(
    shuffleArray(props.labels),
    props.size
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

function isNumberValid(value: number | undefined): boolean {
  return !!(value || value === 0);
}

export default BingoViewer;
