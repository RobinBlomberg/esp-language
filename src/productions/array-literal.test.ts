import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseArrayLiteral } from './array-literal';

const { fail, ok } = createParseAssert(parseArrayLiteral);

suite('ArrayLiteral', () => {
  test('"[ ]"', () => {
    ok(' [] ');
    fail('[');
  });

  test('"[ ElementList ]"', () => {
    ok('[1]');
    ok('[1, 2]');
    fail('[,]');
    fail('[, 1]');
    fail('[1');
    fail('[1,');
    fail('[1,]');
    fail('[1, 2');
    fail('[1, 2,]');
    fail('[1, , 2]');
    fail('[1 2]');
  });
});
