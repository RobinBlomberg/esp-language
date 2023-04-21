import { expect, suite, test } from 'vitest';
import { Identifier, ReturnStatement } from '../../estree';
import { serialize } from '../write';

suite('ReturnStatement', () => {
  test('return ;', () => {
    expect(serialize(ReturnStatement(null))).toBe('return;');
  });

  test('return [no LineTerminator here] Expression[+In, ?Yield, ?Await] ;', () => {
    expect(serialize(ReturnStatement(Identifier('a')))).toBe('return a;');
  });
});
