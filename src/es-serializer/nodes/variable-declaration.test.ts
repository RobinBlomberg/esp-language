import { expect, suite, test } from 'vitest';
import {
  Identifier,
  VariableDeclaration,
  VariableDeclarator,
} from '../../es-ast';
import { serialize } from '../serialize';

suite('VariableDeclaration', () => {
  suite('VariableStatement[Yield, Await]', () => {
    suite('var VariableDeclarationList[+In, ?Yield, ?Await] ;', () => {
      suite('VariableDeclarationList[In, Yield, Await]', () => {
        test('VariableDeclaration[?In, ?Yield, ?Await]', () => {
          expect(
            serialize(
              VariableDeclaration(
                [VariableDeclarator(Identifier('a'), null)],
                'var',
              ),
            ),
          ).toBe('var a;');
        });

        test(
          'VariableDeclarationList[?In, ?Yield, ?Await] , ' +
            'VariableDeclaration[?In, ?Yield, ?Await]',
          () => {
            expect(
              serialize(
                VariableDeclaration(
                  [
                    VariableDeclarator(Identifier('a'), null),
                    VariableDeclarator(Identifier('b'), Identifier('c')),
                  ],
                  'var',
                ),
              ),
            ).toBe('var a,b=c;');
          },
        );
      });
    });
  });

  suite('LexicalDeclaration[In, Yield, Await]', () => {
    suite('LetOrConst BindingList[?In, ?Yield, ?Await] ;', () => {
      test('VariableDeclaration[?In, ?Yield, ?Await]', () => {
        expect(
          serialize(
            VariableDeclaration(
              [VariableDeclarator(Identifier('a'), null)],
              'let',
            ),
          ),
        ).toBe('let a;');
      });

      test(
        'VariableDeclarationList[?In, ?Yield, ?Await] , ' +
          'VariableDeclaration[?In, ?Yield, ?Await]',
        () => {
          expect(
            serialize(
              VariableDeclaration(
                [
                  VariableDeclarator(Identifier('a'), Identifier('b')),
                  VariableDeclarator(Identifier('c'), Identifier('d')),
                ],
                'const',
              ),
            ),
          ).toBe('const a=b,c=d;');
        },
      );
    });
  });
});
