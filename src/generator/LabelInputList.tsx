import React, {
  KeyboardEvent,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import { INPUT_DEFAULT_STYLE } from '../style';

interface LabelInputListPropos {
  labels: string[];
  labelsChange: (labels: string[]) => unknown;
}

interface CaretSelection {
  inputIndex: number;
  start: number | null;
  end: number | null;
}

function LabelInputList({
  labels,
  labelsChange
}: LabelInputListPropos): JSX.Element {
  const [focusIndex, setFocusIndex] = useState<number>();
  const [caretSelection, setCaretSelection] = useState<CaretSelection>();
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

  // Wait for labels change to set caret position in edited input
  useEffect(() => {
    if (caretSelection) {
      const ref: HTMLInputElement | null = inputRefs[caretSelection.inputIndex];
      if (ref) {
        ref.setSelectionRange(caretSelection.start, caretSelection.end);
      }
    }
  }, [labels, inputRefs, caretSelection]);

  function setLabel(value: string, index: number): void {
    const newLabels: string[] = [
      ...labels.slice(0, index),
      value,
      ...labels.slice(index + 1)
    ];
    const ref: HTMLInputElement | null = inputRefs[index];
    if (ref) {
      const start: number | null = ref.selectionStart;
      const end: number | null = ref.selectionEnd;
      setCaretSelection({ inputIndex: index, start, end });
    }
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

  function takeFocusAndSaveCaretPosition(
    { key, shiftKey }: KeyboardEvent,
    index: number
  ): void {
    if (key === 'Tab') {
      if (!shiftKey && !labels[index]) {
        // Select next label with current index since the current label
        // disappears
        setFocusIndex(index);
        setCaretSelection({
          start: 0,
          end: labels[index + 1].length,
          inputIndex: index
        });
      } else if (shiftKey) {
        // Select previous label
        const inputIndex: number = index - 1;
        if (inputIndex > labels.length - 1) {
          setCaretSelection({
            start: 0,
            end: labels[inputIndex].length,
            inputIndex
          });
        }
      } else {
        // Select next label
        const inputIndex: number = index + 1;
        if (inputIndex > labels.length - 1) {
          setCaretSelection({
            start: 0,
            end: labels[inputIndex].length,
            inputIndex
          });
        }
      }
    } else {
      setFocusIndex(void 0);
      setCaretSelection(void 0);
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
              onKeyDown={(event) => takeFocusAndSaveCaretPosition(event, index)}
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
