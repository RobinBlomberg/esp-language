import { expect, suite, test } from 'vitest';
import { BlockStatement, FunctionDeclaration, Identifier } from '../../es-ast';
import { serialize } from '../serialize';

suite('FunctionDeclaration', () => {
  test(
    'function BindingIdentifier[?Yield, ?Await] ( FormalParameters[~Yield, ~Await] ) ' +
      '{ FunctionBody[~Yield, ~Await] }',
    () => {
      expect(
        serialize(
          FunctionDeclaration(
            Identifier('a'),
            [],
            BlockStatement([]),
            false,
            false,
          ),
        ),
      ).toBe('function a(){}');
    },
  );
});
