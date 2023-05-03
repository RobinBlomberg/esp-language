import { expect, suite, test } from 'vitest';
import { ImportExpression, Literal } from '../../ast';
import { serialize } from '../serialize';

suite('ImportExpression', () => {
  test('import ( AssignmentExpression[+In, ?Yield, ?Await] )', () => {
    expect(serialize(ImportExpression(Literal('a')))).toBe('import("a")');
  });
});
