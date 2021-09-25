import React, { useState } from 'react';

import BingoViewer from '../bingo/BingoViewer';

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

function Generator(): JSX.Element {
  const labels: string[] = HARD_CODED_STUFF;
  const [title, setTitle] = useState<string>('');
  const [rowNumber, setRowNumber] = useState<number>(3);
  const [columnNumber, setcolumnNumber] = useState<number>(3);

  return (
    <section>
      <h1>Generator</h1>
      <form>
        <label>
          <span>Title: </span>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          <span>Number of rows: </span>
          <input
            type="number"
            name="rowNumber"
            step="1"
            value={rowNumber}
            onChange={(event) =>
              setValidNumber(event.target.value, setRowNumber)
            }
          />
        </label>
        <label>
          <span>Number of columns: </span>
          <input
            type="number"
            name="columnNumber"
            step="1"
            value={columnNumber}
            onChange={(event) =>
              setValidNumber(event.target.value, setcolumnNumber)
            }
          />
        </label>
      </form>
      <BingoViewer
        title={title}
        labels={labels}
        rowNumber={rowNumber}
        columnNumber={columnNumber}></BingoViewer>
    </section>
  );
}

function setValidNumber(
  value: string,
  callback: React.Dispatch<React.SetStateAction<number>>
): void {
  try {
    const v: number = parseInt(value, 10);
    callback(Number.isNaN(v) ? ('' as unknown as number) : v);
  } catch (e) {
    // Do nothing
  }
}

export default Generator;
