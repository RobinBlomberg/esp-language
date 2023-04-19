import { expect, suite, test } from 'vitest';
import { EmptyStatement } from '../../estree';
import { serialize } from '../write';

suite('EmptyStatement', () => {
  test(';', () => {
    expect(serialize(EmptyStatement())).toBe(';');
  });
});
