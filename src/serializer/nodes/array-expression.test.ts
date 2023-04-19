import { expect, suite, test } from 'vitest';
import { ArrayExpression, Identifier, SpreadElement } from '../../estree';
import { serialize } from '../write';

suite('ArrayExpression', () => {
  suite('[ Elision(opt) ]', () => {
    suite('Elision(opt)', () => {
      test(',', () => {
        expect(serialize(ArrayExpression([]))).toBe('[]');
        expect(serialize(ArrayExpression([null]))).toBe('[,]');
      });

      test('Elision ,', () => {
        expect(serialize(ArrayExpression([null, null]))).toBe('[,,]');
        expect(serialize(ArrayExpression([null, null, null]))).toBe('[,,,]');
      });
    });
  });

  suite('[ ElementList[?Yield, ?Await] ]', () => {
    suite('ElementList[?Yield, ?Await]', () => {
      test('Elision(opt) AssignmentExpression[+In, ?Yield, ?Await]', () => {
        expect(serialize(ArrayExpression([Identifier('a')]))).toBe('[a]');
        expect(serialize(ArrayExpression([null, Identifier('a')]))).toBe(
          '[,a]',
        );
      });

      suite('Elision(opt) SpreadElement[?Yield, ?Await]', () => {
        suite('Elision(opt)', () => {
          test(',', () => {
            expect(
              serialize(ArrayExpression([SpreadElement(Identifier('a'))])),
            ).toBe('[...a]');
            expect(
              serialize(
                ArrayExpression([null, SpreadElement(Identifier('a'))]),
              ),
            ).toBe('[,...a]');
          });

          test('Elision ,', () => {
            expect(
              serialize(
                ArrayExpression([null, null, SpreadElement(Identifier('a'))]),
              ),
            ).toBe('[,,...a]');
          });
        });
      });

      test(
        'ElementList[?Yield, ?Await] , Elision(opt) ' +
          'AssignmentExpression[+In, ?Yield, ?Await]',
        () => {
          expect(
            serialize(
              ArrayExpression([Identifier('a'), null, Identifier('b')]),
            ),
          ).toBe('[a,,b]');
        },
      );

      test('ElementList[?Yield, ?Await] , Elision(opt) SpreadElement[?Yield, ?Await]', () => {
        expect(
          serialize(
            ArrayExpression([
              Identifier('a'),
              null,
              SpreadElement(Identifier('b')),
            ]),
          ),
        ).toBe('[a,,...b]');
      });
    });
  });

  test('[ ElementList[?Yield, ?Await] , Elision(opt) ]', () => {
    expect(serialize(ArrayExpression([Identifier('a'), null]))).toBe('[a,,]');
  });
});
