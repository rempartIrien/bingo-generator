import React, { useEffect, useState } from 'react';

import { encode } from '../base64.utils';
import BingoViewer from '../bingo/BingoViewer';

import LabelInputList from './LabelInputList';
import NumberInput from './NumberInput';
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
  const [size, setSize] = useState<number>(3);

  useEffect(() => {
    const encodedContext: string = encode(
      JSON.stringify({
        title,
        labels,
        size
      })
    );
    const url: string = `${document.location.origin}/bingo?context=${encodedContext}`;
    setGeneratedUrl(url);
  }, [title, labels, size]);

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
        <NumberInput
          label="Size"
          value={size}
          valueChange={setSize}></NumberInput>
        <LabelInputList
          labels={labels}
          labelsChange={setLabels}></LabelInputList>
      </form>
      {generatedUrl && <UrlViewer url={generatedUrl}></UrlViewer>}
      <BingoViewer title={title} labels={labels} size={size}></BingoViewer>
    </section>
  );
}

export default Generator;
