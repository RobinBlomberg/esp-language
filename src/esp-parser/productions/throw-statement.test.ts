import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseThrowStatement } from './throw-statement';

const { fail, ok } = createParseAssert(parseThrowStatement);

suite('ThrowStatement', () => {
  test('"throw Expression ;"', () => {
    ok('throw Expression;');
    fail('throw');
    fail('throw;');
    fail('throw Expression');
  });
});
