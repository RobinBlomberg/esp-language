import { suite, test } from 'vitest';
import {
  BlockStatement,
  ExpressionStatement,
  Identifier,
  IfStatement,
} from '../ast';
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

  test('"IfStatement"', () => {
    ok(
      'if (a) {} else {}',
      IfStatement(
        0,
        17,
        Identifier(4, 5, 'a'),
        BlockStatement(7, 9, []),
        BlockStatement(15, 17, []),
      ),
    );
  });
});
