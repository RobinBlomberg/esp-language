import { test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseArrayLiteral } from './array-literal';
import { ArrayLiteral, Literal } from '../ast';

const { fail, ok } = createParseAssert(parseArrayLiteral);

test('ArrayLiteral', () => {
  ok(' [] ', ArrayLiteral(1, 3, []));
  ok('[1]', ArrayLiteral(0, 3, [Literal(1, 2, 1)]));
  ok('[1, 2]', ArrayLiteral(0, 6, [Literal(1, 2, 1), Literal(4, 5, 2)]));
  fail('[');
  fail('[1,');
  fail('[1,]');
  fail('[1, 2');
  fail('[1 2]');
  fail('[,]');
  fail('[, 2]');
});
