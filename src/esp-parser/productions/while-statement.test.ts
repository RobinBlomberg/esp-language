import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseWhileStatement } from './while-statement';

const { error, ok, unused } = createParseAssert(parseWhileStatement);

suite('WhileStatement', () => {
  test('"while ( Expression ) Statement"', () => {
    unused();
    ok('while (Expression) Statement;');
    error('while');
    error('while (');
    error('while (Expression');
    error('while (Expression)');
  });
});
