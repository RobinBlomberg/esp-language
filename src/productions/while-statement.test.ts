import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseWhileStatement } from './while-statement';

const { fail, ok } = createParseAssert(parseWhileStatement);

suite('WhileStatement', () => {
  test('"while ( Expression ) Statement"', () => {
    ok('while (Expression) Statement;');
    fail('while');
    fail('while (');
    fail('while (Expression');
    fail('while (Expression)');
  });
});
