import { shuffleArray, toGrid } from './random.util';

describe(toGrid.name, () => {
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
      'nine'
    ];
  });

  it('should return an array of array', () => {
    const result: string[][] = toGrid(array, 3, 3);
    expect(Array.isArray(result)).toBeTruthy();
    result.forEach((v, i) => expect(Array.isArray(result[i])).toBeTruthy());
  });

  it('should return a grid of given dimensions', () => {
    const numbers: [number, number][] = [
      [3, 3],
      [3, 2],
      [1, 3],
      [0, 0],
      [3, 0],
      [0, 1]
    ];
    numbers.forEach(([a, b]) => {
      const result: string[][] = toGrid(array, a, b);
      expect(result.length).toBe(a);
      result.forEach((v, i) => expect(result[i].length).toBe(b));
    });
  });

  it('should return a grid that contains all elements of the given array', () => {
    const result: string[][] = toGrid(array, 3, 3);
    array.forEach((item) => {
      expect(result.flat()).toContain(item);
    });
  });

  describe('when the given array has less elements than the given grid dimensions', () => {
    it('should return the maximum squared grid that contains all elements', () => {
      const result: string[][] = toGrid(array, 4, 4);
      expect(result.length).toBe(3);
      result.forEach((v, i) => expect(result[i].length).toBe(3));

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
        'seventeen'
      ];
      const result2: string[][] = toGrid(array, 5, 4);
      expect(result2.length).toBe(4);
      result2.forEach((v, i) => expect(result2[i].length).toBe(4));
    });
  });
});

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
