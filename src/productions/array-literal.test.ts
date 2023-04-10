import { test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseArrayLiteral } from './array-literal';
import { arrayLiteral, literal } from '../node-factory';

const { fail, ok } = createParseAssert(parseArrayLiteral);

test('ArrayLiteral', () => {
  ok(' [] ', arrayLiteral(1, 3, []));
  ok('[1]', arrayLiteral(0, 3, [literal(1, 2, 1)]));
  ok('[1, 2]', arrayLiteral(0, 6, [literal(1, 2, 1), literal(4, 5, 2)]));
  fail('[');
  fail('[1,');
  fail('[1,]');
  fail('[1, 2');
  fail('[1 2]');
  fail('[,]');
  fail('[, 2]');
});
