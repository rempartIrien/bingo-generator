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

const label: string = css`
  aspect-ratio: 1;
  display: block;
  border: 1px solid var(--color-regular);
  padding: 1rem;
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
      color: var(--color-regular);

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
        border: 10px solid var(--color-accent);
      }
    }
  }

  & > input:checked {
    & + span {
      color: var(--color-primary);

      &::before {
        display: block;
      }
    }
  }
`;

// See template for grid-template-columns
const Grid = styled.div`
  display: grid;
  gap: 0;
  border: 1px solid var(--color-regular);
`;

function BingoViewer({ title, labels, size }: BingoViewerProps): JSX.Element {
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [winningMessage, setWinningMessage] = useState<string>();
  const [randomizedStuff, setRandomizedStuff] = useState<string[][]>();

  useEffect(() => {
    if (isNumberValid(size) && Array.isArray(labels)) {
      const newStuff: string[][] = toGrid(shuffleArray(labels), size);
      setRandomizedStuff(newStuff);
      setSelectedTiles([]);
    }
  }, [labels, size]);

  useEffect(() => {
    if (isComplete(selectedTiles, size)) {
      setWinningMessage('BINGO');
    } else {
      setWinningMessage('');
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
        {winningMessage}
        <Grid style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
          {randomizedStuff.map((array, rowIndex) =>
            array.map((value, columnIndex) => (
              <label key={`${rowIndex}_${columnIndex}`} className={label}>
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
            ))
          )}
        </Grid>
        {winningMessage}
      </form>
    </section>
  );
}

function isNumberValid(value: number | undefined): boolean {
  return !!(value || value === 0);
}

function isComplete(tiles: Tile[], size: number): boolean {
  return (
    hasDiagonalComplete(tiles, size) ||
    hasCompleteRow(tiles, size) ||
    hasCompleteColumn(tiles, size)
  );
}

function hasCompleteRow(tiles: Tile[], rowNumber: number): boolean {
  return hasRowOrColumnComplete(tiles, rowNumber, 'rowIndex');
}

function hasCompleteColumn(tiles: Tile[], rowNumber: number): boolean {
  return hasRowOrColumnComplete(tiles, rowNumber, 'columnIndex');
}

function hasRowOrColumnComplete(
  tiles: Tile[],
  size: number,
  key: keyof Tile
): boolean {
  type Registry = Record<Tile[typeof key], number>;
  const registry: Registry = [...Array(size)].reduce(
    (acc: Registry, cur, index) => ({ ...acc, [index]: 0 }),
    {}
  );
  const usagesByKey: Registry = tiles.reduce(
    (acc, cur) => ({ ...acc, [cur[key]]: acc[cur[key]] + 1 }),
    registry
  );
  return Object.values(usagesByKey).some((v) => v === size);
}

function hasDiagonalComplete(tiles: Tile[], size: number): boolean {
  const firstDiagonalComplete: boolean =
    tiles.filter((t) => t.rowIndex === t.columnIndex).length === size;
  const secondDiagonalComplete: boolean =
    tiles.filter((t) => t.rowIndex + t.columnIndex === size - 1).length ===
    size;
  return firstDiagonalComplete || secondDiagonalComplete;
}

export default BingoViewer;
