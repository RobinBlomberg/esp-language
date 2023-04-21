import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseReturnStatement } from './return-statement';

const { fail, ok } = createParseAssert(parseReturnStatement);

suite('ReturnStatement', () => {
  test('"return Expression ;"', () => {
    ok('return Expression;');
    fail('return');
    fail('return;');
    fail('return Expression');
  });
});
