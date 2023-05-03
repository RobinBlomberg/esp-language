import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseExpressionStatement } from './expression-statement';

const { error, ok, unused } = createParseAssert(parseExpressionStatement);

suite('ExpressionStatement', () => {
  test(/* s */ `Expression ';'`, () => {
    unused();
    ok('a;');
    error(';');
    error('a');
  });
});
