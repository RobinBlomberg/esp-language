import { expect, suite, test } from 'vitest';
import { BreakStatement, Identifier } from '../../ast';
import { serialize } from '../serialize';

suite('BreakStatement', () => {
  test('break ;', () => {
    expect(serialize(BreakStatement(null))).toBe('break;');
  });

  test('break [no LineTerminator here] LabelIdentifier[?Yield, ?Await] ;', () => {
    expect(serialize(BreakStatement(Identifier('a')))).toBe('break a;');
  });
});
