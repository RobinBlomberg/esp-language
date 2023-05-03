import { expect, suite, test } from 'vitest';
import {
  ExpressionStatement,
  ForDeclaration,
  ForOfStatement,
  Identifier,
} from '../../ast';
import { serialize } from '../serialize';

suite('ForOfStatement', () => {
  test(
    'for ( [lookahead ∉ { let, async of }] LeftHandSideExpression[?Yield, ?Await] of ' +
      'AssignmentExpression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          ForOfStatement(
            Identifier('a'),
            Identifier('b'),
            ExpressionStatement(Identifier('c')),
            false,
          ),
        ),
      ).toBe('for(a of b)c;');
    },
  );

  test(
    'for ( var ForBinding[?Yield, ?Await] of AssignmentExpression[+In, ?Yield, ?Await] ) ' +
      'Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          ForOfStatement(
            ForDeclaration('var', Identifier('a'), null),
            Identifier('b'),
            ExpressionStatement(Identifier('c')),
            false,
          ),
        ),
      ).toBe('for(var a of b)c;');
    },
  );

  test(
    'for ( ForDeclaration[?Yield, ?Await] of AssignmentExpression[+In, ?Yield, ?Await] ) ' +
      'Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          ForOfStatement(
            ForDeclaration('const', Identifier('a'), null),
            Identifier('b'),
            ExpressionStatement(Identifier('c')),
            false,
          ),
        ),
      ).toBe('for(const a of b)c;');
    },
  );

  test(
    '[+Await] for await ( [lookahead ≠ let] LeftHandSideExpression[?Yield, ?Await] of ' +
      'AssignmentExpression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          ForOfStatement(
            Identifier('a'),
            Identifier('b'),
            ExpressionStatement(Identifier('c')),
            true,
          ),
        ),
      ).toBe('for await(a of b)c;');
    },
  );

  test(
    '[+Await] for await ( var ForBinding[?Yield, ?Await] of ' +
      'AssignmentExpression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          ForOfStatement(
            ForDeclaration('var', Identifier('a'), null),
            Identifier('b'),
            ExpressionStatement(Identifier('c')),
            true,
          ),
        ),
      ).toBe('for await(var a of b)c;');
    },
  );

  test(
    '[+Await] for await ( ForDeclaration[?Yield, ?Await] of ' +
      'AssignmentExpression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          ForOfStatement(
            ForDeclaration('const', Identifier('a'), null),
            Identifier('b'),
            ExpressionStatement(Identifier('c')),
            true,
          ),
        ),
      ).toBe('for await(const a of b)c;');
    },
  );
});
