import { expect, suite, test } from 'vitest';
import {
  AnonymousDefaultExportedFunctionDeclaration,
  BlockStatement,
  FunctionDeclaration,
  Identifier,
} from '../../es-ast';
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

  test(
    '[+Default] function ( FormalParameters[~Yield, ~Await] ) ' +
      '{ FunctionBody[~Yield, ~Await] }',
    () => {
      expect(
        serialize(
          AnonymousDefaultExportedFunctionDeclaration(
            [],
            BlockStatement([]),
            false,
            false,
          ),
        ),
      ).toBe('function(){}');
    },
  );
});
