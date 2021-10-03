import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import React, { useEffect, useState } from 'react';

import { shuffleArray, toGrid } from './random.util';

interface BingoViewerProps {
  title: string;
  labels: string[];
  size: number;
}

interface Tile {
  rowIndex: number;
  columnIndex: number;
}

interface CompleteStuffIndices {
  diagonals: number[];
  rows: number[];
  columns: number[];
}

const label: string = css`
  aspect-ratio: 1;
  display: block;
  border: 1px solid var(--color-regular-text);
  word-break: break-word;
  text-align: center;

  & > input {
    display: none;

    & + span {
      display: block;
      position: relative;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--color-regular-text);
      padding: 1rem;
      cursor: pointer;

      &::before {
        display: none;
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 90%;
        width: 90%;
        border-radius: 50%;
        border: 10px solid var(--color-select);
      }
    }
  }

  & > input:checked {
    & + span {
      &::before {
        display: block;
      }
    }
  }
`;

const inBingo: string = css`
  background-color: var(--color-primary);
  & > input + span {
    color: var(--color-select-text);
  }
`;

// See template for grid-template-columns
const Grid = styled.div`
  display: grid;
  gap: 0;
  border: 1px solid var(--color-regular-text);
`;

function BingoViewer({ title, labels, size }: BingoViewerProps): JSX.Element {
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [completeStuffIndices, setCompleteStuffIndices] =
    useState<CompleteStuffIndices>();
  const [randomizedStuff, setRandomizedStuff] = useState<string[][]>();

  useEffect(() => {
    if (isNumberValid(size) && Array.isArray(labels)) {
      const newStuff: string[][] = toGrid(shuffleArray(labels), size);
      setRandomizedStuff(newStuff);
      setSelectedTiles([]);
    }
  }, [labels, size]);

  useEffect(() => {
    const indices: CompleteStuffIndices = getCompleteStuffIndices(
      selectedTiles,
      size
    );
    if (
      !indices.columns.length &&
      !indices.rows.length &&
      !indices.diagonals.length
    ) {
      setCompleteStuffIndices(void 0);
    } else {
      setCompleteStuffIndices(indices);
    }
  }, [selectedTiles, size]);

  if (!randomizedStuff) {
    return <p>Can&apos;t generate bingo, please check your parameters.</p>;
  }

  function toggleTile(
    isSelected: boolean,
    rowIndex: number,
    columnIndex: number
  ): void {
    if (isSelected) {
      setSelectedTiles([...selectedTiles, { rowIndex, columnIndex }]);
    } else {
      const newSelectedTiles: Tile[] = selectedTiles.filter(
        (tile) => tile.rowIndex !== rowIndex || tile.columnIndex !== columnIndex
      );
      setSelectedTiles(newSelectedTiles);
    }
  }

  return (
    <section>
      <h2>{title}</h2>
      <form>
        <Grid style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
          {randomizedStuff.map((array, rowIndex) =>
            array.map((value, columnIndex) => {
              const isInBingo: boolean = isTileInBingo(
                completeStuffIndices,
                rowIndex,
                columnIndex,
                size
              );
              const className: string = isInBingo
                ? `${label} ${inBingo}`
                : label;
              return (
                <label key={`${rowIndex}_${columnIndex}`} className={className}>
                  <input
                    type="checkbox"
                    checked={selectedTiles.some(
                      (t) =>
                        t.rowIndex === rowIndex && t.columnIndex === columnIndex
                    )}
                    onChange={(event) =>
                      toggleTile(event.target.checked, rowIndex, columnIndex)
                    }
                  />
                  <span>{value}</span>
                </label>
              );
            })
          )}
        </Grid>
      </form>
    </section>
  );
}

function isNumberValid(value: number | undefined): boolean {
  return !!(value || value === 0);
}

function isTileInBingo(
  completeStuffIndices: CompleteStuffIndices | undefined,
  rowIndex: number,
  columnIndex: number,
  size: number
): boolean {
  if (!completeStuffIndices) {
    return false;
  }
  // Row
  if (completeStuffIndices.rows.includes(rowIndex)) {
    return true;
  }
  // Column
  if (completeStuffIndices.columns.includes(columnIndex)) {
    return true;
  }
  // Diagonal 1
  if (rowIndex === columnIndex && completeStuffIndices.diagonals.includes(0)) {
    return true;
  }
  // Diagonal 2
  if (
    columnIndex + rowIndex === size - 1 &&
    completeStuffIndices.diagonals.includes(1)
  ) {
    return true;
  }
  return false;
}

function getCompleteStuffIndices(
  tiles: Tile[],
  size: number
): CompleteStuffIndices {
  return {
    diagonals: getCompleteDiagobalIndices(tiles, size),
    rows: getCompleteRowIndices(tiles, size),
    columns: getCompleteColumnsIndices(tiles, size)
  };
}

function getCompleteRowIndices(tiles: Tile[], rowNumber: number): number[] {
  return hasRowOrColumnComplete(tiles, rowNumber, 'rowIndex');
}

function getCompleteColumnsIndices(tiles: Tile[], rowNumber: number): number[] {
  return hasRowOrColumnComplete(tiles, rowNumber, 'columnIndex');
}

function hasRowOrColumnComplete(
  tiles: Tile[],
  size: number,
  key: keyof Tile
): number[] {
  type Registry = Record<Tile[typeof key], number>;
  const registry: Registry = [...Array(size)].reduce(
    (acc: Registry, cur, index) => ({ ...acc, [index]: 0 }),
    {}
  );
  const usagesByKey: Registry = tiles.reduce(
    (acc, cur) => ({ ...acc, [cur[key]]: acc[cur[key]] + 1 }),
    registry
  );
  return Object.values(usagesByKey).reduce(
    (acc, v, index) => (v === size ? acc.concat(index) : acc),
    [] as number[]
  );
}

function getCompleteDiagobalIndices(tiles: Tile[], size: number): number[] {
  const firstDiagonalComplete: boolean =
    tiles.filter((t) => t.rowIndex === t.columnIndex).length === size;
  const secondDiagonalComplete: boolean =
    tiles.filter((t) => t.rowIndex + t.columnIndex === size - 1).length ===
    size;
  return [firstDiagonalComplete, secondDiagonalComplete].reduce(
    (acc, cur, index) => (cur ? acc.concat(index) : acc),
    [] as number[]
  );
}

export default BingoViewer;
