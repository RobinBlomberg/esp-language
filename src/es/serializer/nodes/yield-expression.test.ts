import { expect, suite, test } from 'vitest';
import { Identifier, YieldExpression } from '../../ast';
import { serialize } from '../serialize';

suite('YieldExpression', () => {
  test('yield', () => {
    expect(serialize(YieldExpression(null, false))).toBe('yield');
  });

  test('yield [no LineTerminator here] AssignmentExpression[?In, +Yield, ?Await]', () => {
    expect(serialize(YieldExpression(Identifier('a'), false))).toBe('yield a');
  });

  test('yield [no LineTerminator here] * AssignmentExpression[?In, +Yield, ?Await]', () => {
    expect(serialize(YieldExpression(Identifier('a'), true))).toBe('yield*a');
  });
});
