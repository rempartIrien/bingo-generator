import React from 'react';

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
        type="number"
        name="columnNumber"
        step="1"
        value={value}
        onChange={(event) => handleRawInputValue(event.target.value)}
      />
    </label>
  );
}

export default NumberInput;
