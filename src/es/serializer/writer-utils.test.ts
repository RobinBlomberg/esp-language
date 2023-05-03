import { expect, test } from 'vitest';
import {
  isIdentifierPartChar,
  isIdentifierStart,
  needsSpaceBetween,
} from './writer-utils';

test('isIdentifierPartChar', () => {
  expect(isIdentifierPartChar('a')).toBe(true);
  expect(isIdentifierPartChar('0')).toBe(true);
});

test('isIdentifierStart', () => {
  expect(isIdentifierStart('a')).toBe(true);
  expect(isIdentifierStart('0')).toBe(false);
});

test('needsSpaceBetween', () => {
  expect(needsSpaceBetween(':', 'a')).toBe(false);
  expect(needsSpaceBetween('a', ':')).toBe(false);

  expect(needsSpaceBetween('_', 'a')).toBe(true);
  expect(needsSpaceBetween('0', '0')).toBe(true);
  expect(needsSpaceBetween('0', 'a')).toBe(true);
  expect(needsSpaceBetween('a', '_')).toBe(true);
  expect(needsSpaceBetween('a', '0')).toBe(true);
  expect(needsSpaceBetween('a', 'a')).toBe(true);
});
