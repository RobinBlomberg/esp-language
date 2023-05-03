import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBreakStatement } from './break-statement';

const { error, ok, unused } = createParseAssert(parseBreakStatement);

suite('BreakStatement', () => {
  test(/* s */ `'break' ';'`, () => {
    unused();
    ok('break;');
    error('break');
  });
});
