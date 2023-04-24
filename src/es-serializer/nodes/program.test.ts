import { expect, suite, test } from 'vitest';
import { ExpressionStatement, Identifier, Program } from '../../es-ast';
import { serialize } from '../serialize';

suite('Program', () => {
  suite('ScriptBody<opt>', () => {
    test('StatementList[~Yield, ~Await, ~Return]', () => {
      expect(serialize(Program([], 'script'))).toBe('');
      expect(
        serialize(
          Program(
            [
              ExpressionStatement(Identifier('a')),
              ExpressionStatement(Identifier('b')),
            ],
            'script',
          ),
        ),
      ).toBe('a;b;');
    });
  });
});
