import { consume, error, lex, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir';
import { parseArrayLiteral } from './array-literal';
import { parseExpression } from './expression';
import { parseIdentifier } from './identifier';
import { parseLiteral } from './literal';
import { parseObjectLiteral } from './object-literal';
import { parseSetLiteral } from './set-literal';

export const parsePrimaryExpression: Parser<IR.Expression> = (data, i) => {
  const token = lex(data, i);
  if (token.abrupt) return token;

  switch (token.value) {
    case '[':
      return parseArrayLiteral(data, i);
    case '{': {
      const nextToken = lex(data, i + 1);
      if (nextToken.abrupt) return error(nextToken);
      return nextToken.value === '['
        ? parseSetLiteral(data, i)
        : parseObjectLiteral(data, i);
    }
    case '(': {
      const open = consume(data, i, TokenType.Punctuator, '(');
      if (open.abrupt) return open;
      i = open.end;

      const expression = parseExpression(data, i);
      if (expression.abrupt) return error(expression);
      i = expression.end;

      const close = consume(data, i, TokenType.Punctuator, ')');
      if (close.abrupt) return error(close);

      expression.start = open.start;
      expression.end = close.end;
      return expression;
    }
    default: {
      const literal = parseLiteral(data, i);
      if (!literal.abrupt) return literal;

      return parseIdentifier(data, i);
    }
  }
};
