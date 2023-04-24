import { expect, suite, test } from 'vitest';
import { ExpressionStatement, Identifier } from '../../es-ast';
import { serialize } from '../serialize';

suite('ExpressionStatement', () => {
  test(
    '[lookahead ∉ { {, function, async [no LineTerminator here] function, class, let [ }] ' +
      'Expression[+In, ?Yield, ?Await] ;',
    () => {
      expect(serialize(ExpressionStatement(Identifier('a')))).toBe('a;');
    },
  );
});
