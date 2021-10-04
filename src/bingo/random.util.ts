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
