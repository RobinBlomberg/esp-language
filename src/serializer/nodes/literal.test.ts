import { expect, test } from 'vitest';
import { Literal } from '../../estree';
import { serialize } from '../write';

test('Literal', () => {
  expect(serialize(Literal(''))).toBe('""');
});
