import { expect, suite, test } from 'vitest';
import { Range } from './range';

suite('Range', () => {
  suite('*[Symbol.iterator]', () => {
    suite('iteration', () => {
      suite('number', () => {
        test('exclusive range', () => {
          const output: number[] = [];
          for (const v of new Range(0, 5)) output.push(v);
          expect(output).toStrictEqual([0, 1, 2, 3, 4]);
        });

        test('inclusive range', () => {
          const output: number[] = [];
          for (const v of new Range(0, 5, true)) output.push(v);
          expect(output).toStrictEqual([0, 1, 2, 3, 4, 5]);
        });
      });

      suite('string', () => {
        test('exclusive range', () => {
          const output: string[] = [];
          for (const v of new Range('b', 'f')) output.push(v);
          expect(output).toStrictEqual(['b', 'c', 'd', 'e']);
        });

        test('inclusive range', () => {
          const output: string[] = [];
          for (const v of new Range('b', 'f', true)) output.push(v);
          expect(output).toStrictEqual(['b', 'c', 'd', 'e', 'f']);
        });
      });
    });

    suite('spreading', () => {
      test('exclusive range', () => {
        expect([...new Range(0, 5)]).toStrictEqual([0, 1, 2, 3, 4]);
      });

      test('inclusive range', () => {
        expect([...new Range(0, 5, true)]).toStrictEqual([0, 1, 2, 3, 4, 5]);
      });
    });
  });

  suite('contains', () => {
    suite('number', () => {
      test('exclusive range', () => {
        expect(new Range(0, 5).contains(-1)).toBe(false);
        expect(new Range(0, 5).contains(0)).toBe(true);
        expect(new Range(0, 5).contains(5)).toBe(false);
        expect(new Range(0, 5).contains(6)).toBe(false);
      });

      test('inclusive range', () => {
        expect(new Range(0, 5, true).contains(-1)).toBe(false);
        expect(new Range(0, 5, true).contains(0)).toBe(true);
        expect(new Range(0, 5, true).contains(5)).toBe(true);
        expect(new Range(0, 5, true).contains(6)).toBe(false);
      });
    });

    test('strings', () => {
      test('exclusive range', () => {
        expect(new Range('b', 'e').contains('a')).toBe(false);
        expect(new Range('b', 'e').contains('b')).toBe(true);
        expect(new Range('b', 'e').contains('e')).toBe(false);
        expect(new Range('b', 'e').contains('f')).toBe(false);
      });

      test('inclusive range', () => {
        expect(new Range('b', 'e', true).contains('a')).toBe(false);
        expect(new Range('b', 'e', true).contains('b')).toBe(true);
        expect(new Range('b', 'e', true).contains('e')).toBe(true);
        expect(new Range('b', 'e', true).contains('f')).toBe(false);
      });
    });
  });

  suite('reverse', () => {
    suite('iteration', () => {
      suite('number', () => {
        test('exclusive range', () => {
          const output: number[] = [];
          for (const v of new Range(0, 5).reverse()) output.push(v);
          expect(output).toStrictEqual([4, 3, 2, 1, 0]);
        });

        test('inclusive range', () => {
          const output: number[] = [];
          for (const v of new Range(0, 5, true).reverse()) output.push(v);
          expect(output).toStrictEqual([5, 4, 3, 2, 1, 0]);
        });
      });

      suite('string', () => {
        test('exclusive range', () => {
          const output: string[] = [];
          for (const v of new Range('b', 'f').reverse()) output.push(v);
          expect(output).toStrictEqual(['e', 'd', 'c', 'b']);
        });

        test('inclusive range', () => {
          const output: string[] = [];
          for (const v of new Range('b', 'f', true).reverse()) output.push(v);
          expect(output).toStrictEqual(['f', 'e', 'd', 'c', 'b']);
        });
      });
    });

    suite('spreading', () => {
      test('exclusive range', () => {
        expect([...new Range(0, 5).reverse()]).toStrictEqual([4, 3, 2, 1, 0]);
      });

      test('inclusive range', () => {
        expect([...new Range(0, 5, true).reverse()]).toStrictEqual([
          5, 4, 3, 2, 1, 0,
        ]);
      });
    });
  });
});
