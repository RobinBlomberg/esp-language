import { expect, suite, test } from 'vitest';
import { Identifier, SpreadElement } from '../../estree';
import { serialize } from '../write';

suite('SpreadElement', () => {
  test('... AssignmentExpression[+In, ?Yield, ?Await]', () => {
    expect(serialize(SpreadElement(Identifier('a')))).toBe('...a');
  });
});
