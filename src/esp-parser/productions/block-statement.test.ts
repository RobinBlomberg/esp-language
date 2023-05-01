import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBlockStatement } from './block-statement';

const { error, ok, unused } = createParseAssert(parseBlockStatement);

suite('BlockStatement', () => {
  test(/* s */ `'{' StatementList? '}'`, () => {
    unused();
    ok('{}');
    ok('{a;}');
    ok('{a;b;}');
    error('{');
    error('{;');
    error('{a');
    error('{a;');
    error('{a}');
    error('{a;b');
    error('{a;b;');
    error('{a;b}');
  });
});
