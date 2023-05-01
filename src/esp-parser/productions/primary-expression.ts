import { Parser, TokenType, abrupt, consume, lex } from '../../esp-lexer';
import { error } from '../../esp-lexer/abrupt';
import { Expression } from '../ast';
import { parseArrayLiteral } from './array-literal';
import { parseExpression } from './expression';
import { parseIdentifier } from './identifier';
import { parseLiteral } from './literal';
import { parseObjectLiteral } from './object-literal';
import { parseSetLiteral } from './set-literal';

export const parsePrimaryExpression: Parser<Expression> = (data, i) => {
  const token = lex(data, i);
  if (abrupt(token)) return token;

  switch (token.value) {
    case '[':
      return parseArrayLiteral(data, i);
    case '{': {
      const nextToken = lex(data, i + 1);
      if (abrupt(nextToken)) return error(nextToken);
      return nextToken.value === '['
        ? parseSetLiteral(data, i)
        : parseObjectLiteral(data, i);
    }
    case '(': {
      const open = consume(data, i, TokenType.Punctuator, '(');
      if (abrupt(open)) return open;
      i = open.end;

      const expression = parseExpression(data, i);
      if (abrupt(expression)) return error(expression);
      i = expression.end;

      const close = consume(data, i, TokenType.Punctuator, ')');
      if (abrupt(close)) return error(close);

      expression.start = open.start;
      expression.end = close.end;
      return expression;
    }
    default: {
      const literal = parseLiteral(data, i);
      if (!abrupt(literal)) return literal;

      return parseIdentifier(data, i);
    }
  }
};
