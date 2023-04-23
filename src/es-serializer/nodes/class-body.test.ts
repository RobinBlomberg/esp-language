import { expect, suite, test } from 'vitest';
import { ClassBody, Identifier, PropertyDefinition } from '../../es-ast';
import { serialize } from '../serialize';

suite('ClassBody', () => {
  suite('ClassElementList[?Yield, ?Await]', () => {
    test('ClassElement[?Yield, ?Await]', () => {
      expect(
        serialize(
          ClassBody([PropertyDefinition(Identifier('a'), null, false, false)]),
        ),
      ).toBe('a;');
    });

    test('ClassElementList[?Yield, ?Await] ClassElement[?Yield, ?Await]', () => {
      expect(
        serialize(
          ClassBody([
            PropertyDefinition(Identifier('a'), null, false, false),
            PropertyDefinition(Identifier('b'), Identifier('c'), true, true),
          ]),
        ),
      ).toBe('a;static[b]=c;');
    });
  });
});
