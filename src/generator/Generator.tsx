import React, { useEffect, useState } from 'react';

import { encode } from '../base64.utils';
import BingoViewer from '../bingo/BingoViewer';

import GridDimensionInput from './GridDimensionInput';
import LabelInputList from './LabelInputList';
import UrlViewer from './UrlViewer';

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
  const [labels, setLabels] = useState<string[]>(HARD_CODED_STUFF);
  const [title, setTitle] = useState<string>('');
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [rowNumber, setRowNumber] = useState<number>(3);
  const [columnNumber, setColumnNumber] = useState<number>(3);

  useEffect(() => {
    const encodedContext: string = encode(
      JSON.stringify({
        title,
        labels,
        rowNumber,
        columnNumber
      })
    );
    const url: string = `${document.location.origin}/bingo?context=${encodedContext}`;
    setGeneratedUrl(url);
  }, [title, labels, rowNumber, columnNumber]);

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
        <LabelInputList
          labels={labels}
          labelsChange={setLabels}></LabelInputList>
        <GridDimensionInput
          rowNumber={rowNumber}
          columnNumber={columnNumber}
          rowNumberChange={setRowNumber}
          columnNumberChange={setColumnNumber}></GridDimensionInput>
      </form>
      {generatedUrl && <UrlViewer url={generatedUrl}></UrlViewer>}
      <BingoViewer
        title={title}
        labels={labels}
        rowNumber={rowNumber}
        columnNumber={columnNumber}></BingoViewer>
    </section>
  );
}

export default Generator;
