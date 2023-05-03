import { expect, it, suite, test } from 'vitest';
import { ExpressionStatement, Identifier, ObjectExpression } from '../../ast';
import { serialize } from '../serialize';

suite('ExpressionStatement', () => {
  test(
    '[lookahead ∉ { {, function, async [no LineTerminator here] function, class, let [ }] ' +
      'Expression[+In, ?Yield, ?Await] ;',
    () => {
      expect(serialize(ExpressionStatement(Identifier('a')))).toBe('a;');
    },
  );

  it('should wrap object expression statements in parentheses', () => {
    expect(serialize(ExpressionStatement(ObjectExpression([])))).toBe('({});');
  });
});
