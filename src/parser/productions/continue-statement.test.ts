import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseContinueStatement } from './continue-statement';

const { fail, ok } = createParseAssert(parseContinueStatement);

suite('ContinueStatement', () => {
  test('"continue ;"', () => {
    ok('continue;');
    fail('continue');
  });
});
