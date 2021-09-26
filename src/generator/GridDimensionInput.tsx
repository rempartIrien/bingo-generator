import React from 'react';

import NumberInput from './NumberInput';

interface GridDimensionInputProps {
  rowNumber: number;
  columnNumber: number;
  rowNumberChange: (value: number) => unknown;
  columnNumberChange: (value: number) => unknown;
}

function GridDimensionInput(props: GridDimensionInputProps): JSX.Element {
  return (
    <fieldset>
      <legend>Grid dimensions</legend>
      <NumberInput
        label="Number of rows"
        value={props.rowNumber}
        valueChange={props.rowNumberChange}></NumberInput>
      <NumberInput
        label="Number of columns"
        value={props.columnNumber}
        valueChange={props.columnNumberChange}></NumberInput>
    </fieldset>
  );
}

export default GridDimensionInput;
