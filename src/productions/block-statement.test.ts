import { suite, test } from 'vitest';
import { BlockStatement } from '../ast';
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
    fail('{');
    fail('{{');
    fail('{{}');
    fail('{{}{');
    fail('{{}{}');
  });
});
