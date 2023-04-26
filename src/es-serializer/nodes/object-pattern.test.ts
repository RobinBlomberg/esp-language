import { expect, suite, test } from 'vitest';
import {
  AssignmentPattern,
  AssignmentProperty,
  Identifier,
  ObjectPattern,
  RestElement,
} from '../../es-ast';
import { serialize } from '../serialize';

suite('ObjectPattern', () => {
  suite('ObjectAssignmentPattern[Yield, Await]', () => {
    test('{ }', () => {
      expect(serialize(ObjectPattern([]))).toBe('{}');
    });

    suite('{ AssignmentRestProperty[?Yield, ?Await] }', () => {
      suite('... DestructuringAssignmentTarget[?Yield, ?Await]', () => {
        suite('DestructuringAssignmentTarget[Yield, Await]', () => {
          test('LeftHandSideExpression[?Yield, ?Await]', () => {
            expect(
              serialize(ObjectPattern([RestElement(Identifier('a'))])),
            ).toBe('{...a}');
          });
        });
      });
    });

    suite('{ AssignmentPropertyList[?Yield, ?Await] }', () => {
      suite('AssignmentPropertyList[Yield, Await]', () => {
        suite('AssignmentProperty[?Yield, ?Await]', () => {
          suite(
            'IdentifierReference[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]<opt>',
            () => {
              suite('Initializer[+In, ?Yield, ?Await]<opt>', () => {
                test('<empty>', () => {
                  expect(
                    serialize(
                      ObjectPattern([
                        AssignmentProperty(
                          Identifier('a'),
                          Identifier('a'),
                          true,
                          false,
                        ),
                      ]),
                    ),
                  ).toBe('{a}');
                });

                test('= AssignmentExpression[?In, ?Yield, ?Await]', () => {
                  expect(
                    serialize(
                      ObjectPattern([
                        AssignmentProperty(
                          Identifier('a'),
                          AssignmentPattern(Identifier('a'), Identifier('b')),
                          true,
                          false,
                        ),
                      ]),
                    ),
                  ).toBe('{a=b}');
                });
              });
            },
          );

          test('PropertyName[?Yield, ?Await] : AssignmentElement[?Yield, ?Await]', () => {
            expect(
              serialize(
                ObjectPattern([
                  AssignmentProperty(
                    Identifier('a'),
                    Identifier('b'),
                    false,
                    false,
                  ),
                ]),
              ),
            ).toBe('{a:b}');
            expect(
              serialize(
                ObjectPattern([
                  AssignmentProperty(
                    Identifier('a'),
                    AssignmentPattern(Identifier('b'), Identifier('c')),
                    false,
                    false,
                  ),
                ]),
              ),
            ).toBe('{a:b=c}');
          });
        });
      });
    });
  });
});
