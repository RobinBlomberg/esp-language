import { test } from 'vitest';
import { identifier, literal, objectLiteral, property } from '../node-factory';
import { createParseAssert } from '../test-utils';
import { parseObjectLiteral } from './object-literal';

const { fail, ok } = createParseAssert(parseObjectLiteral);

test('ObjectLiteral', () => {
  ok(' {} ', objectLiteral(1, 3, []));
  ok(
    '{a: 1}',
    objectLiteral(0, 6, [
      property(1, 5, identifier(1, 2, 'a'), literal(4, 5, 1)),
    ]),
  );
  ok(
    '{a: 1, b: 2}',
    objectLiteral(0, 12, [
      property(1, 5, identifier(1, 2, 'a'), literal(4, 5, 1)),
      property(7, 11, identifier(7, 8, 'b'), literal(10, 11, 2)),
    ]),
  );
  fail('{');
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
