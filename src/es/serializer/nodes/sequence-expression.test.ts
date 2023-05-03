import { expect, suite, test } from 'vitest';
import { Identifier, SequenceExpression } from '../../ast';
import { serialize } from '../serialize';

suite('SequenceExpression', () => {
  test('AssignmentExpression[?In, ?Yield, ?Await]', () => {
    expect(serialize(SequenceExpression([Identifier('a')]))).toBe('a');
  });

  test('Expression[?In, ?Yield, ?Await] , AssignmentExpression[?In, ?Yield, ?Await]', () => {
    expect(
      serialize(SequenceExpression([Identifier('a'), Identifier('b')])),
    ).toBe('a,b');
  });
});
