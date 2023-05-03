import { expect, suite, test } from 'vitest';
import { Identifier, TemplateElement, TemplateLiteral } from '../../ast';
import { serialize } from '../serialize';

suite('TemplateLiteral', () => {
  test('TemplateLiteral[Yield, Await, Tagged]', () => {
    expect(
      serialize(
        TemplateLiteral(
          [
            TemplateElement(false, { cooked: 'a', raw: 'a' }),
            TemplateElement(true, { cooked: 'c', raw: '\\c' }),
          ],
          [Identifier('b')],
        ),
      ),
    ).toBe('`a${b}\\c`');
  });
});
