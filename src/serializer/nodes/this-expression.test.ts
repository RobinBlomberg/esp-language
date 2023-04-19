import { expect, suite, test } from 'vitest';
import { ThisExpression } from '../../estree';
import { serialize } from '../write';

suite('ThisExpression', () => {
  test('this', () => {
    expect(serialize(ThisExpression())).toBe('this');
  });
});
