import { expect, suite, test } from 'vitest';
import {
  Identifier,
  PrivateIdentifier,
  PropertyDefinition,
} from '../../es-ast';
import { serialize } from '../serialize';

suite('PropertyDefinition', () => {
  suite('FieldDefinition[?Yield, ?Await] ;', () => {
    suite(
      'ClassElementName[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]<opt>',
      () => {
        suite('PropertyName[?Yield, ?Await]', () => {
          test('LiteralPropertyName', () => {
            expect(
              serialize(
                PropertyDefinition(Identifier('a'), null, false, false),
              ),
            ).toBe('a;');
            expect(
              serialize(
                PropertyDefinition(
                  Identifier('a'),
                  Identifier('b'),
                  false,
                  false,
                ),
              ),
            ).toBe('a=b;');
          });

          suite('ComputedPropertyName', () => {
            test('[ AssignmentExpression[+In, ?Yield, ?Await] ]', () => {
              expect(
                serialize(
                  PropertyDefinition(Identifier('a'), null, true, false),
                ),
              ).toBe('[a];');
              expect(
                serialize(
                  PropertyDefinition(
                    Identifier('a'),
                    Identifier('b'),
                    true,
                    false,
                  ),
                ),
              ).toBe('[a]=b;');
            });
          });
        });

        suite('PrivateIdentifier', () => {
          test('# IdentifierName', () => {
            expect(
              serialize(
                PropertyDefinition(PrivateIdentifier('a'), null, false, false),
              ),
            ).toBe('#a;');
          });
        });
      },
    );
  });

  test('static FieldDefinition[?Yield, ?Await] ;', () => {
    suite(
      'ClassElementName[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]<opt>',
      () => {
        test('PropertyName[?Yield, ?Await]', () => {
          expect(
            serialize(PropertyDefinition(Identifier('a'), null, false, false)),
          ).toBe('static a;');
          expect(
            serialize(
              PropertyDefinition(Identifier('a'), Identifier('b'), false, true),
            ),
          ).toBe('static a=b;');
        });

        suite('ComputedPropertyName', () => {
          test('[ AssignmentExpression[+In, ?Yield, ?Await] ]', () => {
            expect(
              serialize(PropertyDefinition(Identifier('a'), null, true, false)),
            ).toBe('static [a];');
            expect(
              serialize(
                PropertyDefinition(
                  Identifier('a'),
                  Identifier('b'),
                  true,
                  true,
                ),
              ),
            ).toBe('static [a]=b;');
          });
        });
      },
    );
  });
});
