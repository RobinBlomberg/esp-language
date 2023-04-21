import { expect, suite, test } from 'vitest';
import { DebuggerStatement } from '../../es-ast';
import { serialize } from '../serialize';

suite('DebuggerStatement', () => {
  test('debugger ;', () => {
    expect(serialize(DebuggerStatement())).toBe('debugger;');
  });
});
