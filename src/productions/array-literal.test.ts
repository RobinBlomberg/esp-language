import { suite, test } from 'vitest';
import { ArrayLiteral, Literal } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseArrayLiteral } from './array-literal';

const { fail, ok } = createParseAssert(parseArrayLiteral);

suite('ArrayLiteral', () => {
  test('[ ]', () => {
    ok(' [] ', ArrayLiteral(1, 3, []));
    fail('[');
    fail('[,]');
  });

  test('[ ElementList ]', () => {
    ok('[1]', ArrayLiteral(0, 3, [Literal(1, 2, 1)]));
    ok('[1, 2]', ArrayLiteral(0, 6, [Literal(1, 2, 1), Literal(4, 5, 2)]));
    fail('[1,');
    fail('[1,]');
    fail('[1, 2');
    fail('[1 2]');
    fail('[, 2]');
  });
});
