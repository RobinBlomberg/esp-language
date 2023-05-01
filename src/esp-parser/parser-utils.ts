import {
  Parser,
  Token,
  TokenMatcher,
  consumeToken,
  isAbrupt,
  lex,
} from '../esp-lexer';
import { error } from '../esp-lexer/abrupt';
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
    if (isAbrupt(expression)) return expression;
    i = expression.end;

    while (true) {
      const operator = consumeToken(data, i, operatorToken);
      if (isAbrupt(operator)) return expression;
      i = operator.end;

      const right = parse(data, operator.end);
      if (isAbrupt(right)) return error(right);
      i = right.end;

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

export const lookahead = (data: string, i: number) => {
  return (lex(data, i) as Token).value;
};
