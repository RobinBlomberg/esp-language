import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBlockStatement } from './block-statement';

const { fail, ok } = createParseAssert(parseBlockStatement);

suite('BlockStatement', () => {
  test('"{ StatementList(opt) }"', () => {
    ok('{}');
    ok('{Statement;}');
    ok('{Statement; Statement;}');
    fail('{');
    fail('{;');
    fail('{Statement');
    fail('{Statement;');
    fail('{Statement}');
    fail('{Statement; Statement');
    fail('{Statement; Statement;');
    fail('{Statement; Statement}');
  });
});
