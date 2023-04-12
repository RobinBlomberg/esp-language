import { BinaryExpression, Expression } from '../ast';
import { TokenType } from '../token-type';
import { Parser, consume } from '../token-utils';
import { parseEqualityExpression } from './equality-expression';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * BitwiseANDExpression :
 *   EqualityExpression
 *   BitwiseANDExpression & EqualityExpression
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-BitwiseANDExpression
 */
export const parseBitwiseANDExpression: Parser<Expression> = (data, i) => {
  let expression = parseEqualityExpression(data, i);
  if (expression) i = expression.end;
  else return null;

  while (true) {
    const operator = consume(data, i, TokenType.Punctuator, '&');
    if (operator) i = operator.end;
    else return expression;

    const right = parseEqualityExpression(data, operator.end);
    if (right) i = right.end;
    else return null;

    expression = BinaryExpression(
      expression.start,
      right.end,
      operator.value,
      expression,
      right,
    );
  }
};
