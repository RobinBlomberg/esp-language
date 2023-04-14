import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseUnionClause } from './union-clause';

const { fail, ok } = createParseAssert(parseUnionClause);

suite('UnionClause', () => {
  test('"{ ValueList }"', () => {
    ok('{}');
    ok('{1}');
    ok('{1, 2}');
    fail('');
    fail('{');
    fail('{,}');
    fail('{, 1}');
    fail('{1');
    fail('{1,');
    fail('{1,}');
    fail('{1, 2');
    fail('{1, 2,}');
    fail('{1, , 2}');
    fail('{1 2}');
  });
});
