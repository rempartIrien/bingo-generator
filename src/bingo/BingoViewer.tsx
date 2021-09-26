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

function BingoViewer(props: BingoViewerProps): JSX.Element {
  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([]);
  const [winningMessage, setWinningMessage] = useState<string>();
  const [randomizedStuff, setRandomizedStuff] = useState<string[][]>();

  useEffect(() => {
    if (isNumberValid(props.size) && Array.isArray(props.labels)) {
      const newStuff: string[][] = toGrid(
        shuffleArray(props.labels),
        props.size
      );
      setRandomizedStuff(newStuff);
      setSelectedTiles([]);
    }
  }, [props.labels, props.size]);

  useEffect(() => {
    if (isComplete(selectedTiles, props.size)) {
      setWinningMessage('BINGO');
    } else {
      setWinningMessage('');
    }
  }, [selectedTiles, props.size]);

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
    <>
      <h2>{props.title}</h2>
      <form>
        {winningMessage}
        <table>
          <tbody>
            {randomizedStuff.map((array, rowIndex) => (
              <tr key={rowIndex}>
                {array.map((value, columnIndex) => (
                  <td key={`${rowIndex}_${columnIndex}`}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedTiles.some(
                          (t) =>
                            t.rowIndex === rowIndex &&
                            t.columnIndex === columnIndex
                        )}
                        onChange={(event) =>
                          toggleTile(
                            event.target.checked,
                            rowIndex,
                            columnIndex
                          )
                        }
                      />
                      {value}
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {winningMessage}
      </form>
    </>
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
