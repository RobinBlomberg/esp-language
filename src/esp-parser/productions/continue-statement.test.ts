import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseContinueStatement } from './continue-statement';

const { error, ok, unused } = createParseAssert(parseContinueStatement);

suite('ContinueStatement', () => {
  test('"continue ;"', () => {
    unused();
    ok('continue;');
    error('continue');
  });
});
