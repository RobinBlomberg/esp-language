import { expect, suite, test } from 'vitest';
import { ArrayPattern, Identifier, RestElement } from '../../estree';
import { serialize } from '../write';

suite('ArrayPattern', () => {
  test('[ Elision<opt> AssignmentRestElement[?Yield, ?Await]<opt> ]', () => {
    suite('Elision<opt>', () => {
      test(',', () => {
        expect(serialize(ArrayPattern([RestElement(Identifier('a'))]))).toBe(
          '[...a]',
        );
        expect(
          serialize(ArrayPattern([null, RestElement(Identifier('a'))])),
        ).toBe('[,...a]');
      });

      test('Elision ,', () => {
        expect(
          serialize(ArrayPattern([null, null, RestElement(Identifier('a'))])),
        ).toBe('[,,...a]');
      });
    });
  });

  test('[ AssignmentElementList[?Yield, ?Await] ]', () => {
    expect(serialize(ArrayPattern([Identifier('a')]))).toBe('[a]');
    expect(serialize(ArrayPattern([Identifier('a'), Identifier('b')]))).toBe(
      '[a,b]',
    );
  });

  test(
    '[ AssignmentElementList[?Yield, ?Await] , Elision<opt> ' +
      'AssignmentRestElement[?Yield, ?Await]<opt> ]',
    () => {
      expect(
        serialize(
          ArrayPattern([
            Identifier('a'),
            Identifier('b'),
            RestElement(Identifier('c')),
          ]),
        ),
      ).toBe('[a,b,...c]');
      expect(
        serialize(
          ArrayPattern([Identifier('a'), null, RestElement(Identifier('c'))]),
        ),
      ).toBe('[a,,...c]');
    },
  );
});
