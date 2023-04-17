import { expect, test } from 'vitest';
import { ExpressionStatement, Identifier, IfStatement } from '../../estree';
import { serialize } from '../write';

test('IfStatement', () => {
  expect(
    serialize(
      IfStatement(
        Identifier('Expression'),
        ExpressionStatement(Identifier('Statement')),
        null,
      ),
    ),
  ).toBe('if(Expression)Statement;');
  expect(
    serialize(
      IfStatement(
        Identifier('Expression'),
        ExpressionStatement(Identifier('Statement')),
        ExpressionStatement(Identifier('Statement')),
      ),
    ),
  ).toBe('if(Expression)Statement;else Statement;');
});
