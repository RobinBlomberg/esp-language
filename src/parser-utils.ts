import { BinaryExpression, BinaryOperator, Expression } from './ast';
import { TokenMatcher } from './token';
import { Parser, consumeToken } from './token-utils';

export const createLeftAssociativeBinaryExpressionParser = (
  parse: Parser<Expression>,
  operatorToken: TokenMatcher<BinaryOperator>,
): Parser<Expression> => {
  return (data, i) => {
    let expression = parse(data, i);
    if (expression) i = expression.end;
    else return null;

    while (true) {
      const operator = consumeToken(data, i, operatorToken);
      if (operator) i = operator.end;
      else return expression;

      const right = parse(data, operator.end);
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
};
