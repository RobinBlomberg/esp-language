import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseArrayLiteral } from './array-literal';

const { error, ok, unused } = createParseAssert(parseArrayLiteral);

suite('ArrayLiteral', () => {
  test('"[ ValueList ]"', () => {
    unused();
    ok('[]');
    ok('[1]');
    ok('[1, 2]');
    error('[');
    error('[,]');
    error('[, 1]');
    error('[1');
    error('[1,');
    error('[1,]');
    error('[1, 2');
    error('[1, 2,]');
    error('[1, , 2]');
    error('[1 2]');
  });
});
