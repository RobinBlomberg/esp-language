import { expect, test } from 'vitest';
import { ThisExpression } from '../../estree';
import { serialize } from '../write';

test('this', () => {
  expect(serialize(ThisExpression())).toBe('this');
});
