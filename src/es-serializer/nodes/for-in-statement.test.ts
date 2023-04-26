import { expect, suite, test } from 'vitest';
import {
  ExpressionStatement,
  ForDeclaration,
  ForInStatement,
  Identifier,
} from '../../es-ast';
import { serialize } from '../serialize';

suite('ForInStatement', () => {
  test(
    'for ( [lookahead ≠ let [] LeftHandSideExpression[?Yield, ?Await] in ' +
      'Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          ForInStatement(
            Identifier('a'),
            Identifier('b'),
            ExpressionStatement(Identifier('c')),
          ),
        ),
      ).toBe('for(a in b)c;');
    },
  );

  test(
    'for ( var ForBinding[?Yield, ?Await] in Expression[+In, ?Yield, ?Await] ) ' +
      'Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          ForInStatement(
            ForDeclaration('var', Identifier('a'), null),
            Identifier('b'),
            ExpressionStatement(Identifier('c')),
          ),
        ),
      ).toBe('for(var a in b)c;');
    },
  );

  test(
    'for ( ForDeclaration[?Yield, ?Await] in Expression[+In, ?Yield, ?Await] ) ' +
      'Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          ForInStatement(
            ForDeclaration('const', Identifier('a'), null),
            Identifier('b'),
            ExpressionStatement(Identifier('c')),
          ),
        ),
      ).toBe('for(const a in b)c;');
    },
  );
});
