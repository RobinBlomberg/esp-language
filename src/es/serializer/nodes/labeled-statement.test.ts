import { expect, suite, test } from 'vitest';
import { BlockStatement, Identifier, LabeledStatement } from '../../ast';
import { serialize } from '../serialize';

suite('LabeledStatement', () => {
  test('LabelIdentifier[?Yield, ?Await] : LabelledItem[?Yield, ?Await, ?Return]', () => {
    expect(
      serialize(LabeledStatement(Identifier('a'), BlockStatement([]))),
    ).toBe('a:{}');
  });
});
