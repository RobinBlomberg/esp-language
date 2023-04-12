import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseObjectLiteral } from './object-literal';

const { fail, ok } = createParseAssert(parseObjectLiteral);

suite('ObjectLiteral', () => {
  test('"{ }"', () => {
    ok('{}');
    fail('{');
  });

  test('"{ PropertyDefinitionList }"', () => {
    ok('{a: 1}');
    ok('{a: 1, b: 2}');
    fail('{,');
    fail('{,}');
    fail('{a');
    fail('{a}');
    fail('{a:');
    fail('{a: }');
    fail('{a: 1');
    fail('{a: 1,');
    fail('{a: 1,}');
    fail('{a: 1, b');
    fail('{a: 1, b:');
    fail('{a: 1, b: 2');
    fail('{a: 1, b: 2,');
  });
});
