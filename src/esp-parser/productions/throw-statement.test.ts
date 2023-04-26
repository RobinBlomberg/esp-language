import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseThrowStatement } from './throw-statement';

const { error, ok, unused } = createParseAssert(parseThrowStatement);

suite('ThrowStatement', () => {
  test('"throw Expression ;"', () => {
    unused();
    ok('throw Expression;');
    error('throw');
    error('throw;');
    error('throw Expression');
  });
});
