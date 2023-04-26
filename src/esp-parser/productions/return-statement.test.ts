import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseReturnStatement } from './return-statement';

const { error, ok, unused } = createParseAssert(parseReturnStatement);

suite('ReturnStatement', () => {
  test('"return Expression ;"', () => {
    unused();
    ok('return Expression;');
    error('return');
    error('return;');
    error('return Expression');
  });
});
