import { expect, suite, test } from 'vitest';
import { ExpressionStatement, Identifier, IfStatement } from '../../estree';
import { serialize } from '../write';

suite('IfStatement', () => {
  test(
    'if ( Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return] else ' +
      'Statement[?Yield, ?Await, ?Return]',
    () => {
      expect(
        serialize(
          IfStatement(
            Identifier('Expression'),
            ExpressionStatement(Identifier('Statement')),
            ExpressionStatement(Identifier('Statement')),
          ),
        ),
      ).toBe('if(Expression)Statement;else Statement;');
    },
  );

  test(
    'if ( Expression[+In, ?Yield, ?Await] ) Statement[?Yield, ?Await, ?Return] ' +
      '[lookahead ≠ else]',
    () => {
      expect(
        serialize(
          IfStatement(
            Identifier('Expression'),
            ExpressionStatement(Identifier('Statement')),
            null,
          ),
        ),
      ).toBe('if(Expression)Statement;');
    },
  );
});
