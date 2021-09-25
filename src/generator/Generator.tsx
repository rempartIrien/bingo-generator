import React, {
  KeyboardEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { encode } from '../base64.utils';
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
  const [labels, setLabels] = useState<string[]>(HARD_CODED_STUFF);
  const [title, setTitle] = useState<string>('');
  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [rowNumber, setRowNumber] = useState<number>(3);
  const [columnNumber, setColumnNumber] = useState<number>(3);
  const [focusIndex, setFocusIndex] = useState<number>();
  const newLabelInputRef: RefObject<HTMLInputElement> = useRef(null);
  const inputRefs: (HTMLInputElement | null)[] = useMemo(
    () => [...Array(labels.length)].map(() => null),
    [labels.length]
  );

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

  useEffect(() => {
    if (!focusIndex && focusIndex !== 0) {
      return;
    }
    const ref: HTMLInputElement | null = inputRefs[focusIndex];
    if (ref) {
      ref.focus();
    }
  }, [inputRefs, focusIndex]);

  function setLabel(value: string, index: number): void {
    const newLabels: string[] = [
      ...labels.slice(0, index),
      value,
      ...labels.slice(index + 1)
    ];
    setLabels(newLabels);
  }

  function removeLabelIfNeeded(value: string, index: number): void {
    if (!value) {
      const newLabels: string[] = [
        ...labels.slice(0, index),
        ...labels.slice(index + 1)
      ];
      setLabels(newLabels);
    }
  }

  function addLabel(value: string): void {
    if (value) {
      const newLabels: string[] = [...labels, value];
      setLabels(newLabels);
      if (newLabelInputRef.current) {
        newLabelInputRef.current.value = '';
      }
      setFocusIndex(labels.length);
    }
  }

  function onFocus({ key, shiftKey }: KeyboardEvent, index: number): void {
    if (key === 'Tab' && !shiftKey && !labels[index]) {
      setFocusIndex(index);
    } else {
      setFocusIndex(void 0);
    }
  }

  async function copyToClipboard(generatedUrl: string): Promise<void> {
    await navigator.clipboard.writeText(generatedUrl);
  }

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
        <fieldset>
          <legend>Labels:</legend>
          <ol>
            {labels.map((label, index) => (
              <li key={index}>
                <input
                  ref={(e) => (inputRefs[index] = e)}
                  type="text"
                  name={`label_${index}`}
                  value={label}
                  onChange={(event) => setLabel(event.target.value, index)}
                  onKeyDown={(event) => onFocus(event, index)}
                  onBlur={(event) =>
                    removeLabelIfNeeded(event.target.value, index)
                  }
                />
              </li>
            ))}
            <li>
              <input
                ref={newLabelInputRef}
                type="text"
                name={`newLabel`}
                onChange={(event) => addLabel(event.target.value)}
              />
            </li>
          </ol>
        </fieldset>
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
              setValidNumber(event.target.value, setColumnNumber)
            }
          />
        </label>
      </form>
      {generatedUrl && (
        <>
          <p>
            Bingo url:{' '}
            <a target="_blank" rel="noreferrer noopener" href={generatedUrl}>
              {generatedUrl}
            </a>
          </p>
          <p>
            Copy the above url or click this button to share it:&nbsp;
            <button type="button" onClick={() => copyToClipboard(generatedUrl)}>
              Copy url to clipboard
            </button>
          </p>
        </>
      )}
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
