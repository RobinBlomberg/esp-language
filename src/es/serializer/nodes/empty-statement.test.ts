import { expect, suite, test } from 'vitest';
import { EmptyStatement } from '../../ast';
import { serialize } from '../serialize';

suite('EmptyStatement', () => {
  test(';', () => {
    expect(serialize(EmptyStatement())).toBe(';');
  });
});
