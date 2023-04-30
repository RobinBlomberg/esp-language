import { expect, it, suite } from 'vitest';
import {
  ArrayLiteral,
  BlockStatement,
  CallExpression,
  ExpressionStatement,
  Identifier,
  IfStatement,
  Literal,
  NodeType,
  Script,
  StaticMemberExpression,
} from '../esp-parser';
import { walk } from './walk';

suite('walk', () => {
  it('should walk the AST', () => {
    const result: string[] = [];
    let stack: NodeType[] = [];

    walk(
      Script(0, 47, [
        IfStatement(
          0,
          47,
          Literal(4, 8, true),
          BlockStatement(10, 47, [
            ExpressionStatement(
              12,
              45,
              CallExpression(
                12,
                44,
                StaticMemberExpression(
                  12,
                  23,
                  Identifier(12, 19, 'console'),
                  Identifier(20, 23, 'log'),
                ),
                [
                  ArrayLiteral(24, 43, [
                    Literal(25, 32, 'Hello'),
                    Literal(34, 42, 'world!'),
                  ]),
                ],
              ),
            ),
          ]),
          null,
        ),
      ]),
      (node, depth) => {
        stack = [...stack.slice(0, depth), node.type];
        result.push(stack.join(' '));
      },
    );

    expect(result).toEqual([
      'Script',
      'Script IfStatement',
      'Script IfStatement Literal',
      'Script IfStatement BlockStatement',
      'Script IfStatement BlockStatement ExpressionStatement',
      'Script IfStatement BlockStatement ExpressionStatement CallExpression',
      'Script IfStatement BlockStatement ExpressionStatement CallExpression StaticMemberExpression',
      'Script IfStatement BlockStatement ExpressionStatement CallExpression StaticMemberExpression Identifier',
      'Script IfStatement BlockStatement ExpressionStatement CallExpression StaticMemberExpression Identifier',
      'Script IfStatement BlockStatement ExpressionStatement CallExpression ArrayLiteral',
      'Script IfStatement BlockStatement ExpressionStatement CallExpression ArrayLiteral Literal',
      'Script IfStatement BlockStatement ExpressionStatement CallExpression ArrayLiteral Literal',
    ]);
  });
});
