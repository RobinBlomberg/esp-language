import { expect, suite, test } from 'vitest';
import { BlockStatement, ExpressionStatement, Identifier } from '../../ast';
import { serialize } from '../serialize';

suite('BlockStatement', () => {
  suite('Block[?Yield, ?Await, ?Return]', () => {
    test('{ StatementList[?Yield, ?Await, ?Return]<opt> }', () => {
      expect(serialize(BlockStatement([]))).toBe('{}');
      expect(
        serialize(BlockStatement([ExpressionStatement(Identifier('a'))])),
      ).toBe('{a;}');
      expect(
        serialize(
          BlockStatement([
            ExpressionStatement(Identifier('a')),
            ExpressionStatement(Identifier('b')),
          ]),
        ),
      ).toBe('{a;b;}');
    });
  });
});
