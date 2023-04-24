import { expect, suite, test } from 'vitest';
import { BlockStatement, CatchClause, TryStatement } from '../../es-ast';
import { serialize } from '../serialize';

suite('TryStatement', () => {
  test('try Block[?Yield, ?Await, ?Return] Catch[?Yield, ?Await, ?Return]', () => {
    expect(
      serialize(
        TryStatement(
          BlockStatement([]),
          CatchClause(null, BlockStatement([])),
          null,
        ),
      ),
    ).toBe('try{}catch{}');
  });

  test('try Block[?Yield, ?Await, ?Return] Finally[?Yield, ?Await, ?Return]', () => {
    expect(
      serialize(TryStatement(BlockStatement([]), null, BlockStatement([]))),
    ).toBe('try{}finally{}');
  });

  test(
    'try Block[?Yield, ?Await, ?Return] Catch[?Yield, ?Await, ?Return] ' +
      'Finally[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          TryStatement(
            BlockStatement([]),
            CatchClause(null, BlockStatement([])),
            BlockStatement([]),
          ),
        ),
      ).toBe('try{}catch{}finally{}');
    },
  );
});
