import { expect, suite, test } from 'vitest';
import { ContinueStatement, Identifier } from '../../estree';
import { serialize } from '../write';

suite('ContinueStatement', () => {
  test('continue ;', () => {
    expect(serialize(ContinueStatement(null))).toBe('continue;');
  });

  test('continue [no LineTerminator here] LabelIdentifier[?Yield, ?Await] ;', () => {
    expect(serialize(ContinueStatement(Identifier('a')))).toBe('continue a;');
  });
});
