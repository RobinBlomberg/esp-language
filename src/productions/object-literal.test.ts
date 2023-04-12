import { suite, test } from 'vitest';
import { Identifier, Literal, ObjectLiteral, Property } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseObjectLiteral } from './object-literal';

const { fail, ok } = createParseAssert(parseObjectLiteral);

suite('ObjectLiteral', () => {
  test('"{ }"', () => {
    ok(' {} ', ObjectLiteral(1, 3, []));
    fail('{');
  });

  test('"{ PropertyDefinitionList }"', () => {
    ok(
      '{a: 1}',
      ObjectLiteral(0, 6, [
        Property(1, 5, Identifier(1, 2, 'a'), Literal(4, 5, 1)),
      ]),
    );
    ok(
      '{a: 1, b: 2}',
      ObjectLiteral(0, 12, [
        Property(1, 5, Identifier(1, 2, 'a'), Literal(4, 5, 1)),
        Property(7, 11, Identifier(7, 8, 'b'), Literal(10, 11, 2)),
      ]),
    );
    fail('{a');
    fail('{a:');
    fail('{a: 1');
    fail('{a: 1,');
    fail('{a: 1, b');
    fail('{a: 1, b:');
    fail('{a: 1, b: 2');
    fail('{a: 1,}');
    fail('{a: }');
    fail('{a}');
    fail('{, b: 2}');
  });
});
