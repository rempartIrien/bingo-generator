import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { encode } from '../base64.utils';
import BingoViewer from '../bingo/BingoViewer';
import { INPUT_DEFAULT_STYLE } from '../style/base-style';
import { Context, useUrlContext } from '../url-context.hook';

import LabelInputList from './LabelInputList';
import NumberInput from './NumberInput';
import UrlViewer from './UrlViewer';

const DEFAULT: Record<string, unknown> = {
  title: 'Digit bingo',
  size: 3,
  labels: [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
  ]
};

const DEFAULT_STRING: string = encode(JSON.stringify(DEFAULT));

function Generator(): JSX.Element {
  const { context: currentSearch, decryptedContext }: Context = useUrlContext();
  const history = useHistory();

  const [labels, setLabels] = useState<string[]>();
  const [title, setTitle] = useState<string>();
  const [size, setSize] = useState<number>();
  const [search, setSearch] = useState<string>();
  const [generatedUrl, setGeneratedUrl] = useState<string>();

  useEffect(() => {
    if (!currentSearch) {
      setSearch(`context=${DEFAULT_STRING}`);
    }
  }, [currentSearch]);

  useEffect(() => {
    if (decryptedContext) {
      setLabels(decryptedContext.labels as string[]);
      setTitle(decryptedContext.title as string);
      setSize(decryptedContext.size as number);
    }
  }, [decryptedContext]);

  useEffect(() => {
    if (search) {
      const url: string = `${document.location.origin}/bingo?${search}`;
      setGeneratedUrl(url);
      history.replace({
        search
      });
    }
  }, [search, history]);

  function updateContext(key: string, value: unknown): void {
    const encodedContext: string = encode(
      JSON.stringify({
        ...decryptedContext,
        [key]: value
      })
    );
    setSearch(`context=${encodedContext}`);
  }

  if (!size || (!title && title !== '') || !labels) {
    return <p>Wait for a moment...</p>;
  }

  return (
    <section>
      <h1>Generator</h1>
      <form>
        <label>
          <span>Title: </span>
          <input
            className={INPUT_DEFAULT_STYLE}
            type="text"
            name="title"
            value={title}
            onChange={(event) => updateContext('title', event.target.value)}
          />
        </label>
        <NumberInput
          label="Size"
          value={size}
          valueChange={(size) => updateContext('size', size)}></NumberInput>
        <LabelInputList
          labels={labels}
          labelsChange={(labels) =>
            updateContext('labels', labels)
          }></LabelInputList>
      </form>
      {generatedUrl && <UrlViewer url={generatedUrl}></UrlViewer>}
      <BingoViewer title={title} labels={labels} size={size}></BingoViewer>
    </section>
  );
}

export default Generator;
