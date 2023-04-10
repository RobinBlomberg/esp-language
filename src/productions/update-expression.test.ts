import { suite, test } from 'vitest';
import { Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseUpdateExpression } from './update-expression';

const { ok } = createParseAssert(parseUpdateExpression);

suite('UpdateExpression', () => {
  test('Identifier', () => {
    ok(' abc ', Identifier(1, 4, 'abc'));
  });
});
