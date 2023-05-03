import { expect, suite, test } from 'vitest';
import { ThisExpression } from '../../ast';
import { serialize } from '../serialize';

suite('ThisExpression', () => {
  test('this', () => {
    expect(serialize(ThisExpression())).toBe('this');
  });
});
