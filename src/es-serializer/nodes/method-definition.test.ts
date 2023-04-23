import { expect, suite, test } from 'vitest';
import {
  BlockStatement,
  FunctionExpression,
  Identifier,
  MethodDefinition,
} from '../../es-ast';
import { serialize } from '../serialize';

suite('MethodDefinition', () => {
  suite('MethodDefinition[?Yield, ?Await]', () => {
    test(
      'ClassElementName[?Yield, ?Await] ( UniqueFormalParameters[~Yield, ~Await] ) { ' +
        'FunctionBody[~Yield, ~Await] }',
      () => {
        expect(
          serialize(
            MethodDefinition(
              Identifier('a'),
              FunctionExpression(null, [], BlockStatement([]), false, false),
              'method',
              false,
              false,
            ),
          ),
        ).toBe('a(){};');
      },
    );

    test('GeneratorMethod[?Yield, ?Await]', () => {
      expect(
        serialize(
          MethodDefinition(
            Identifier('a'),
            FunctionExpression(null, [], BlockStatement([]), true, false),
            'method',
            false,
            false,
          ),
        ),
      ).toBe('*a(){};');
    });

    test('AsyncMethod[?Yield, ?Await]', () => {
      expect(
        serialize(
          MethodDefinition(
            Identifier('a'),
            FunctionExpression(null, [], BlockStatement([]), false, true),
            'method',
            false,
            false,
          ),
        ),
      ).toBe('async a(){};');
    });

    test('AsyncGeneratorMethod[?Yield, ?Await]', () => {
      expect(
        serialize(
          MethodDefinition(
            Identifier('a'),
            FunctionExpression(null, [], BlockStatement([]), true, true),
            'method',
            true,
            false,
          ),
        ),
      ).toBe('async*[a](){};');
    });

    test('get ClassElementName[?Yield, ?Await] ( ) { FunctionBody[~Yield, ~Await] }', () => {
      expect(
        serialize(
          MethodDefinition(
            Identifier('a'),
            FunctionExpression(null, [], BlockStatement([]), false, false),
            'get',
            false,
            false,
          ),
        ),
      ).toBe('get a(){};');
    });

    test(
      'set ClassElementName[?Yield, ?Await] ( PropertySetParameterList ) ' +
        '{ FunctionBody[~Yield, ~Await] }',
      () => {
        expect(
          serialize(
            MethodDefinition(
              Identifier('a'),
              FunctionExpression(null, [], BlockStatement([]), false, false),
              'set',
              false,
              false,
            ),
          ),
        ).toBe('set a(){};');
      },
    );
  });

  test('static MethodDefinition[?Yield, ?Await]', () => {
    expect(
      serialize(
        MethodDefinition(
          Identifier('a'),
          FunctionExpression(null, [], BlockStatement([]), false, false),
          'method',
          false,
          true,
        ),
      ),
    ).toBe('static a(){};');
  });
});
