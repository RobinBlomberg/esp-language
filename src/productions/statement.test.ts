import { suite, test } from 'vitest';
import { BlockStatement, ExpressionStatement, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseStatement } from './statement';

const { ok } = createParseAssert(parseStatement);

suite('Statement', () => {
  test('"BlockStatement"', () => {
    ok('{}', BlockStatement(0, 2, []));
  });

  test('"ExpressionStatement"', () => {
    ok('a;', ExpressionStatement(0, 2, Identifier(0, 1, 'a')));
  });
});
