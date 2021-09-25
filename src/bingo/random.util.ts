export function toGrid(
  stuff: string[],
  rowNumber: number,
  columnNumber: number
): string[][] {
  if (stuff.length < rowNumber * columnNumber) {
    const root: number = Math.floor(Math.sqrt(stuff.length));
    return toGrid(stuff, root, root);
  }
  return [...Array(rowNumber)].map((v, rowIndex) =>
    [...Array(columnNumber)].map(
      (v, colIndex) => stuff[rowIndex * rowNumber + colIndex]
    )
  );
}

export function shuffleArray(stuff: string[]): string[] {
  return stuff.reduce(
    ({ remaining, result }) => {
      const index: number = Math.floor(Math.random() * remaining.length);
      const item: string = remaining[index];
      const newRemaining: string[] = [
        ...remaining.slice(0, index),
        ...remaining.slice(index + 1)
      ];
      return { remaining: newRemaining, result: result.concat(item) };
    },
    {
      remaining: stuff,
      result: [] as string[]
    }
  ).result;
}
