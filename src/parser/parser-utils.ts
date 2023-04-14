import { Parser, TokenMatcher, consumeToken } from '../lexer';
import { BinaryExpression, BinaryOperator, Expression, Node } from './ast';
import { NodeType } from './node-type';

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

export const isNodeSimple = (node: Node): boolean => {
  return (
    node.type === NodeType.Identifier ||
    node.type === NodeType.StaticMemberExpression ||
    node.type === NodeType.ComputedMemberExpression
  );
};
