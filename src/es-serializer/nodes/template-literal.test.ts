import { expect, suite, test } from 'vitest';
import { Identifier, TemplateElement, TemplateLiteral } from '../../es-ast';
import { serialize } from '../serialize';

suite('TemplateLiteral', () => {
  test('TemplateLiteral[Yield, Await, Tagged]', () => {
    expect(
      serialize(
        TemplateLiteral(
          [
            TemplateElement(false, { raw: 'a', cooked: 'a' }),
            TemplateElement(true, { raw: '\\c', cooked: 'c' }),
          ],
          [Identifier('b')],
        ),
      ),
    ).toBe('`a${b}\\c`');
  });
});
