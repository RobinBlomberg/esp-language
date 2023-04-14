import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBreakStatement } from './break-statement';

const { fail, ok } = createParseAssert(parseBreakStatement);

suite('BreakStatement', () => {
  test('"break ;"', () => {
    ok('break;');
    fail('break');
  });
});
