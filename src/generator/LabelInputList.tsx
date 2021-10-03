import React, {
  KeyboardEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { INPUT_DEFAULT_STYLE } from '../style/base-style';

interface LabelInputListPropos {
  labels: string[];
  labelsChange: (labels: string[]) => unknown;
}

function LabelInputList({
  labels,
  labelsChange
}: LabelInputListPropos): JSX.Element {
  const [focusIndex, setFocusIndex] = useState<number>();
  const newLabelInputRef: RefObject<HTMLInputElement> = useRef(null);
  const inputRefs: (HTMLInputElement | null)[] = useMemo(
    () => [...Array(labels.length)].map(() => null),
    [labels.length]
  );

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
    labelsChange(newLabels);
  }

  function removeLabelIfNeeded(value: string, index: number): void {
    if (!value) {
      const newLabels: string[] = [
        ...labels.slice(0, index),
        ...labels.slice(index + 1)
      ];
      labelsChange(newLabels);
    }
  }

  function addLabel(value: string): void {
    if (value) {
      const newLabels: string[] = [...labels, value];
      labelsChange(newLabels);
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

  return (
    <fieldset>
      <legend>Labels:</legend>
      <ol>
        {labels.map((label, index) => (
          <li key={index}>
            <input
              className={INPUT_DEFAULT_STYLE}
              ref={(e) => (inputRefs[index] = e)}
              type="text"
              name={`label_${index}`}
              value={label}
              onChange={(event) => setLabel(event.target.value, index)}
              onKeyDown={(event) => onFocus(event, index)}
              onBlur={(event) => removeLabelIfNeeded(event.target.value, index)}
            />
          </li>
        ))}
        <li>
          <input
            className={INPUT_DEFAULT_STYLE}
            ref={newLabelInputRef}
            type="text"
            name={`newLabel`}
            onChange={(event) => addLabel(event.target.value)}
          />
        </li>
      </ol>
    </fieldset>
  );
}

export default LabelInputList;
