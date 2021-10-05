import React from 'react';

import { INPUT_DEFAULT_STYLE } from '../style';

interface NumberInputProps {
  label: string;
  value: number;
  valueChange: (value: number) => unknown;
}

function NumberInput({
  label,
  value,
  valueChange
}: NumberInputProps): JSX.Element {
  function handleRawInputValue(str: string): void {
    try {
      const v: number = parseInt(str, 10);
      valueChange(Number.isNaN(v) ? ('' as unknown as number) : v);
    } catch (e) {
      // Do nothing
    }
  }

  return (
    <label>
      <span>{label}</span>
      <input
        className={INPUT_DEFAULT_STYLE}
        type="number"
        name="columnNumber"
        step="1"
        min="1"
        value={value}
        onChange={(event) => handleRawInputValue(event.target.value)}
      />
    </label>
  );
}

export default NumberInput;
