import { expect, it, suite, test } from 'vitest';
import {
  CallExpression,
  Identifier,
  SpreadElement,
  UnaryExpression,
} from '../../es-ast';
import { serialize } from '../serialize';

suite('CallExpression', () => {
  suite('CallExpression[?Yield, ?Await] Arguments[?Yield, ?Await]', () => {
    suite('Arguments', () => {
      test('( )', () => {
        expect(serialize(CallExpression(Identifier('a'), [], false))).toBe(
          'a()',
        );
      });

      suite('( ArgumentList[?Yield, ?Await] )', () => {
        suite('ArgumentList[?Yield, ?Await]', () => {
          test('AssignmentExpression[+In, ?Yield, ?Await]', () => {
            expect(
              serialize(
                CallExpression(Identifier('a'), [Identifier('b')], false),
              ),
            ).toBe('a(b)');
          });

          test('... AssignmentExpression[+In, ?Yield, ?Await]', () => {
            expect(
              serialize(
                CallExpression(
                  Identifier('a'),
                  [SpreadElement(Identifier('b'))],
                  false,
                ),
              ),
            ).toBe('a(...b)');
          });

          test('ArgumentList[?Yield, ?Await] , AssignmentExpression[+In, ?Yield, ?Await]', () => {
            expect(
              serialize(
                CallExpression(
                  Identifier('a'),
                  [Identifier('b'), Identifier('c')],
                  false,
                ),
              ),
            ).toBe('a(b,c)');
          });

          test(
            'ArgumentList[?Yield, ?Await] , ' +
              '... AssignmentExpression[+In, ?Yield, ?Await]',
            () => {
              expect(
                serialize(
                  CallExpression(
                    Identifier('a'),
                    [Identifier('b'), SpreadElement(Identifier('c'))],
                    false,
                  ),
                ),
              ).toBe('a(b,...c)');
            },
          );
        });
      });
    });
  });

  suite('CallExpression[?Yield, ?Await] OptionalChain[?Yield, ?Await]', () => {
    suite('OptionalChain[?Yield, ?Await]', () => {
      test('?. Arguments[?Yield, ?Await]', () => {
        expect(serialize(CallExpression(Identifier('a'), [], true))).toBe(
          'a?.()',
        );
      });
    });
  });

  it('should parenthesize when needed', () => {
    expect(
      serialize(
        CallExpression(UnaryExpression('!', true, Identifier('a')), [], false),
      ),
    ).toBe('(!a)()');
  });
});
