import { expect, it, suite } from 'vitest';
import { ChainExpression, Identifier, MemberExpression } from '../../es-ast';
import { serialize } from '../serialize';

suite('ChainExpression', () => {
  it('should serialize its `expression` property', () => {
    expect(
      serialize(
        ChainExpression(
          MemberExpression(Identifier('a'), Identifier('b'), false, true),
        ),
      ),
    ).toBe('a?.b');
  });
});
