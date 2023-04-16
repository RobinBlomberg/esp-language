import { Parser, TokenMatcher, consumeToken } from '../lexer';
import {
  BinaryExpression,
  BinaryOperator,
  Expression,
  Node,
  NodeType,
  SimpleNode,
} from './ast';

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

/**
 * @see https://tc39.es/ecma262/#sec-static-semantics-assignmenttargettype
 */
export const isSimpleNode = (node: Node): node is SimpleNode => {
  return (
    node.type === NodeType.Identifier ||
    node.type === NodeType.StaticMemberExpression ||
    node.type === NodeType.ComputedMemberExpression
  );
};
