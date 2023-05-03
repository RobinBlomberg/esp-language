import { expect, suite, test } from 'vitest';
import {
  FunctionBody,
  FunctionExpression,
  Identifier,
  Property,
} from '../../ast';
import { serialize } from '../serialize';

suite('Property', () => {
  test('IdentifierReference[?Yield, ?Await]', () => {
    expect(
      serialize(
        Property(Identifier('a'), Identifier('a'), 'init', false, true, false),
      ),
    ).toBe('a');
  });

  suite(
    'PropertyName[?Yield, ?Await] : AssignmentExpression[+In, ?Yield, ?Await]',
    () => {
      suite('PropertyName[?Yield, ?Await]', () => {
        test('LiteralPropertyName', () => {
          expect(
            serialize(
              Property(
                Identifier('a'),
                Identifier('b'),
                'init',
                false,
                false,
                false,
              ),
            ),
          ).toBe('a:b');
        });

        test('LiteralPropertyName', () => {
          expect(
            serialize(
              Property(
                Identifier('a'),
                Identifier('b'),
                'init',
                false,
                false,
                true,
              ),
            ),
          ).toBe('[a]:b');
        });
      });
    },
  );

  suite('MethodDefinition[?Yield, ?Await]', () => {
    test(
      'ClassElementName[?Yield, ?Await] ( UniqueFormalParameters[~Yield, ~Await] ) { ' +
        'FunctionBody[~Yield, ~Await] }',
      () => {
        expect(
          serialize(
            Property(
              Identifier('a'),
              FunctionExpression(null, [], FunctionBody([]), false, false),
              'init',
              true,
              false,
              false,
            ),
          ),
        ).toBe('a(){}');
      },
    );

    suite('GeneratorMethod[?Yield, ?Await]', () => {
      test(
        '* ClassElementName[?Yield, ?Await] ( UniqueFormalParameters[+Yield, ~Await] ) { ' +
          'GeneratorBody }',
        () => {
          expect(
            serialize(
              Property(
                Identifier('a'),
                FunctionExpression(
                  null,
                  [Identifier('b'), Identifier('c')],
                  FunctionBody([]),
                  true,
                  false,
                ),
                'init',
                true,
                false,
                false,
              ),
            ),
          ).toBe('*a(b,c){}');
        },
      );
    });

    suite('AsyncMethod[?Yield, ?Await]', () => {
      test(
        'async [no LineTerminator here] ClassElementName[?Yield, ?Await] ( ' +
          'UniqueFormalParameters[~Yield, +Await] ) { AsyncFunctionBody }',
        () => {
          expect(
            serialize(
              Property(
                Identifier('a'),
                FunctionExpression(null, [], FunctionBody([]), false, true),
                'init',
                true,
                false,
                false,
              ),
            ),
          ).toBe('async a(){}');
        },
      );
    });

    suite('AsyncGeneratorMethod[Yield, Await]', () => {
      test(
        'async [no LineTerminator here] * ClassElementName[?Yield, ?Await] ( ' +
          'UniqueFormalParameters[+Yield, +Await] ) { AsyncGeneratorBody }',
        () => {
          expect(
            serialize(
              Property(
                Identifier('a'),
                FunctionExpression(null, [], FunctionBody([]), true, true),
                'init',
                true,
                false,
                false,
              ),
            ),
          ).toBe('async*a(){}');
        },
      );
    });

    test('get ClassElementName[?Yield, ?Await] ( ) { FunctionBody[~Yield, ~Await] }', () => {
      expect(
        serialize(
          Property(
            Identifier('a'),
            FunctionExpression(null, [], FunctionBody([]), false, false),
            'get',
            true,
            false,
            false,
          ),
        ),
      ).toBe('get a(){}');
    });

    test(
      'set ClassElementName[?Yield, ?Await] ( PropertySetParameterList ) { ' +
        'FunctionBody[~Yield, ~Await] }',
      () => {
        expect(
          serialize(
            Property(
              Identifier('a'),
              FunctionExpression(null, [], FunctionBody([]), false, false),
              'set',
              true,
              false,
              false,
            ),
          ),
        ).toBe('set a(){}');
      },
    );
  });
});
