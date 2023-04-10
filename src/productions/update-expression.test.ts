import { it, suite } from 'vitest';
import { Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseUpdateExpression } from './update-expression';

const { ok } = createParseAssert(parseUpdateExpression);

suite('UpdateExpression', () => {
  it('should be able to parse basic expressions', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
  });
});
