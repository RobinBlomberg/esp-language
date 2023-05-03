import { expect, suite, test } from 'vitest';
import { Identifier, SpreadElement } from '../../ast';
import { serialize } from '../serialize';

suite('SpreadElement', () => {
  test('... AssignmentExpression[+In, ?Yield, ?Await]', () => {
    expect(serialize(SpreadElement(Identifier('a')))).toBe('...a');
  });
});
