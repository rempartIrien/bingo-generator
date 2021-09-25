import React from 'react';

import { shuffleArray, toGrid } from './random.util';

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
  const randomizedStuff: string[][] = toGrid(
    shuffleArray(HARD_CODED_STUFF),
    3,
    3
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

export default Bingo;
