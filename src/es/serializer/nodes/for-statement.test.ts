import { expect, suite, test } from 'vitest';
import {
  ExpressionStatement,
  ForStatement,
  Identifier,
  VariableDeclaration,
  VariableDeclarator,
} from '../../ast';
import { serialize } from '../serialize';

suite('ForStatement', () => {
  test(
    'for ( [lookahead ≠ let [] Expression[~In, ?Yield, ?Await]<opt> ; ' +
      'Expression[+In, ?Yield, ?Await]<opt> ; Expression[+In, ?Yield, ?Await]<opt> ) ' +
      'Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          ForStatement(
            Identifier('a'),
            Identifier('b'),
            Identifier('c'),
            ExpressionStatement(Identifier('d')),
          ),
        ),
      ).toBe('for(a;b;c)d;');
    },
  );

  test(
    'for ( var VariableDeclarationList[~In, ?Yield, ?Await] ; Expression[+In, ?Yield, ?Await]<opt> ; ' +
      'Expression[+In, ?Yield, ?Await]<opt> ) Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          ForStatement(
            VariableDeclaration(
              [
                VariableDeclarator(Identifier('a'), null),
                VariableDeclarator(Identifier('b'), Identifier('c')),
              ],
              'var',
            ),
            Identifier('d'),
            Identifier('e'),
            ExpressionStatement(Identifier('f')),
          ),
        ),
      ).toBe('for(var a,b=c;d;e)f;');
    },
  );

  test(
    'for ( LexicalDeclaration[~In, ?Yield, ?Await] Expression[+In, ?Yield, ?Await]<opt> ; ' +
      'Expression[+In, ?Yield, ?Await]<opt> ) Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          ForStatement(
            VariableDeclaration(
              [
                VariableDeclarator(Identifier('a'), null),
                VariableDeclarator(Identifier('b'), Identifier('c')),
              ],
              'let',
            ),
            Identifier('d'),
            Identifier('e'),
            ExpressionStatement(Identifier('f')),
          ),
        ),
      ).toBe('for(let a,b=c;d;e)f;');
    },
  );
});
