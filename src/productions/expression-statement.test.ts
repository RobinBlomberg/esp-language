import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseExpressionStatement } from './expression-statement';

const { fail, ok } = createParseAssert(parseExpressionStatement);

suite('ExpressionStatement', () => {
  test('"Expression ;"', () => {
    ok('Expression;');
    fail(' ');
    fail(';');
    fail('Expression');
  });
});
