import { describe, it, suite } from 'vitest';
import { Identifier, UpdateExpression } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseUpdateExpression } from './update-expression';

const { ok } = createParseAssert(parseUpdateExpression);

suite('UpdateExpression', () => {
  it('should be able to parse basic expressions', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
  });

  describe('UpdateExpression', () => {
    it('should handle non-nested update expressions', () => {
      ok('++a', UpdateExpression(0, 3, '++', Identifier(2, 3, 'a'), true));
      ok('--a', UpdateExpression(0, 3, '--', Identifier(2, 3, 'a'), true));
      ok('a++', UpdateExpression(0, 3, '++', Identifier(0, 1, 'a'), false));
      ok('a--', UpdateExpression(0, 3, '--', Identifier(0, 1, 'a'), false));
    });
  });
});
