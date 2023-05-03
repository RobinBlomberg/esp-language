import { expect, suite, test } from 'vitest';
import { ArrayPattern, Identifier, RestElement } from '../../ast';
import { serialize } from '../serialize';

suite('RestElement', () => {
  test('... BindingIdentifier[?Yield, ?Await]', () => {
    expect(serialize(RestElement(Identifier('a')))).toBe('...a');
  });

  test('... BindingPattern[?Yield, ?Await]', () => {
    expect(serialize(RestElement(ArrayPattern([])))).toBe('...[]');
  });
});
