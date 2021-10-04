import { shuffleArray } from './random.util';

describe(shuffleArray.name, () => {
  let array: string[];
  beforeEach(() => {
    array = [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thriteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
      'twenty'
    ];
  });

  it('should return an array', () => {
    const result: string[] = shuffleArray(array);
    expect(Array.isArray(result)).toBeTruthy();
  });

  it('should return an array containg all given elements', () => {
    const result: string[] = shuffleArray(array);
    array.forEach((item) => expect(result).toContain(item));
  });

  it('should shuffle the given array', () => {
    let equalityNumber: number = 0;
    const results: string[][] = [...Array(10)].map(() => shuffleArray(array));
    results.forEach((array, index) => {
      results.slice(index + 1).forEach((array2) => {
        if (areEqual(array, array2)) {
          ++equalityNumber;
        }
      });
    });
    expect(equalityNumber).toBeLessThanOrEqual(1);
  });
});

function areEqual(array1: string[], array2: string[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every((item, index) => item === array2[index]);
}
