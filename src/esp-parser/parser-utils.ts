import {
  Parser,
  Token,
  TokenMatcher,
  TokenType,
  consumeToken,
  error,
  lex,
} from '../esp-lexer';
import { IR } from '../ir';

export const createLeftAssociativeBinaryExpressionParser = (
  parse: Parser<IR.Expression>,
  operatorToken: TokenMatcher<Token<TokenType.Punctuator, IR.BinaryOperator>>,
): Parser<IR.Expression> => {
  return (data, i) => {
    let expression = parse(data, i);
    if (expression.abrupt) return expression;
    i = expression.end;

    while (true) {
      const operator = consumeToken(data, i, operatorToken);
      if (operator.abrupt) return expression;
      i = operator.end;

      const right = parse(data, operator.end);
      if (right.abrupt) return error(right);
      i = right.end;

      expression = IR.BinaryExpression(
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
export const isSimpleNode = (node: IR.Node): node is IR.SimpleNode => {
  return (
    node.type === IR.NodeType.Identifier ||
    node.type === IR.NodeType.StaticMemberExpression ||
    node.type === IR.NodeType.ComputedMemberExpression
  );
};

export const lookahead = (data: string, i: number) => {
  return (lex(data, i) as Token).value;
};
