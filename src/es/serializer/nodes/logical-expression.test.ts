import { expect, it, suite, test } from 'vitest';
import { Identifier, LogicalExpression } from '../../ast';
import { serialize } from '../serialize';

suite('LogicalExpression', () => {
  suite('LogicalORExpression[In, Yield, Await]', () => {
    test(
      'LogicalORExpression[?In, ?Yield, ?Await] || ' +
        'LogicalANDExpression[?In, ?Yield, ?Await]',
      () => {
        expect(
          serialize(LogicalExpression('||', Identifier('a'), Identifier('b'))),
        ).toBe('a||b');
      },
    );
  });

  suite('LogicalORExpression[In, Yield, Await]', () => {
    test(
      'LogicalANDExpression[?In, ?Yield, ?Await] && ' +
        'BitwiseORExpression[?In, ?Yield, ?Await]',
      () => {
        expect(
          serialize(LogicalExpression('&&', Identifier('a'), Identifier('b'))),
        ).toBe('a&&b');
      },
    );
  });

  suite('CoalesceExpression[In, Yield, Await]', () => {
    test(
      'CoalesceExpressionHead[?In, ?Yield, ?Await] ?? ' +
        'BitwiseORExpression[?In, ?Yield, ?Await]',
      () => {
        expect(
          serialize(LogicalExpression('??', Identifier('a'), Identifier('b'))),
        ).toBe('a??b');
      },
    );
  });

  it('should parenthesize when needed', () => {
    expect(
      serialize(
        LogicalExpression(
          '||',
          Identifier('a'),
          LogicalExpression('||', Identifier('b'), Identifier('c')),
        ),
      ),
    ).toBe('a||(b||c)');
  });
});
