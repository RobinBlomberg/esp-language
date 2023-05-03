import { expect, suite, test } from 'vitest';
import {
  ArrayPattern,
  AssignmentPattern,
  Identifier,
  ObjectPattern,
} from '../../ast';
import { serialize } from '../serialize';

suite('AssignmentPattern', () => {
  suite('SingleNameBinding[?Yield, ?Await]', () => {
    test('BindingIdentifier[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]<opt>', () => {
      expect(
        serialize(AssignmentPattern(Identifier('a'), Identifier('b'))),
      ).toBe('a=b');
    });
  });

  suite(
    'BindingPattern[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]<opt>',
    () => {
      suite('BindingPattern[?Yield, ?Await]', () => {
        test('ObjectBindingPattern', () => {
          expect(
            serialize(AssignmentPattern(ObjectPattern([]), Identifier('a'))),
          ).toBe('{}=a');
        });

        test('ArrayBindingPattern', () => {
          expect(
            serialize(AssignmentPattern(ArrayPattern([]), Identifier('a'))),
          ).toBe('[]=a');
        });
      });
    },
  );
});
