import { expect, suite, test } from 'vitest';
import { DebuggerStatement } from '../../estree';
import { serialize } from '../write';

suite('DebuggerStatement', () => {
  test('debugger ;', () => {
    expect(serialize(DebuggerStatement())).toBe('debugger;');
  });
});
