import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseObjectLiteral } from './object-literal';

const { error, ok, unused } = createParseAssert(parseObjectLiteral);

suite('ObjectLiteral', () => {
  test('"{ }"', () => {
    unused();
    ok('{}');
    error('{');
  });

  test('"{ PropertyDefinitionList }"', () => {
    ok('{ a: 1}');
    ok('{ a: 1, b: 2 }');
    error('{ ,');
    error('{ ,}');
    error('{ a');
    error('{ a}');
    error('{ a:');
    error('{ a: }');
    error('{ a: 1');
    error('{ a: 1,');
    error('{ a: 1,}');
    error('{ a: 1, b');
    error('{ a: 1, b:');
    error('{ a: 1, b: 2');
    error('{ a: 1, b: 2,');
  });
});
