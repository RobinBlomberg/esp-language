import { expect, suite, test } from 'vitest';
import {
  Identifier,
  TaggedTemplateExpression,
  TemplateElement,
  TemplateLiteral,
} from '../../ast';
import { serialize } from '../serialize';

suite('TaggedTemplateExpression', () => {
  test('MemberExpression[?Yield, ?Await] TemplateLiteral[?Yield, ?Await, +Tagged]', () => {
    expect(
      serialize(
        TaggedTemplateExpression(
          Identifier('foo'),
          TemplateLiteral(
            [TemplateElement(true, { cooked: 'bar', raw: 'bar' })],
            [],
          ),
        ),
      ),
    ).toBe('foo`bar`');
  });
});
