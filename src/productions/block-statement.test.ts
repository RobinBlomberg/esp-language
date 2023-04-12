import { suite, test } from 'vitest';
import { BlockStatement, ExpressionStatement, Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseBlockStatement } from './block-statement';

const { fail, ok } = createParseAssert(parseBlockStatement);

suite('BlockStatement', () => {
  test('"{ StatementList(opt) }"', () => {
    ok('{}', BlockStatement(0, 2, []));
    ok('{{}}', BlockStatement(0, 4, [BlockStatement(1, 3, [])]));
    ok(
      '{{}{}}',
      BlockStatement(0, 6, [
        BlockStatement(1, 3, []),
        BlockStatement(3, 5, []),
      ]),
    );
    ok(
      '{a;}',
      BlockStatement(0, 4, [ExpressionStatement(1, 3, Identifier(1, 2, 'a'))]),
    );
    ok(
      '{{}a;}',
      BlockStatement(0, 6, [
        BlockStatement(1, 3, []),
        ExpressionStatement(3, 5, Identifier(3, 4, 'a')),
      ]),
    );
    fail('{');
    fail('{{');
    fail('{{}');
    fail('{{}{');
    fail('{{}{}');
    fail('{a');
    fail('{a;');
    fail('{a}');
    fail('{;}');
  });
});
