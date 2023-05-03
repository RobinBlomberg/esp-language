import { expect, suite, test } from 'vitest';
import { DebuggerStatement } from '../../ast';
import { serialize } from '../serialize';

suite('DebuggerStatement', () => {
  test('debugger ;', () => {
    expect(serialize(DebuggerStatement())).toBe('debugger;');
  });
});
