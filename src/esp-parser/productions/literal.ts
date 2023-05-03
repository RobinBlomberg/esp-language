import { Literal } from '../../esp-grammar/ast';
import { error, lex, Parser, TokenType } from '../../esp-lexer';

export const parseLiteral: Parser<Literal> = (data, i) => {
  const token = lex(data, i);
  if (token.abrupt) return token;

  switch (token.type) {
    case TokenType.Keyword:
      switch (token.value) {
        case 'false':
          return Literal(token.start, token.end, false);
        case 'Infinity':
          return Literal(token.start, token.end, Infinity);
        case 'NaN':
          return Literal(token.start, token.end, NaN);
        case 'null':
          return Literal(token.start, token.end, null);
        case 'true':
          return Literal(token.start, token.end, true);
        case 'undefined':
          return Literal(token.start, token.end, undefined);
        default:
          return error(token);
      }
    case TokenType.Number:
      return Literal(token.start, token.end, Number(token.value));
    case TokenType.String: {
      let value = '';

      for (i = 1; i < token.value.length - 1; i++) {
        if (token.value[i] === '\\') {
          i++;
        }

        value += token.value[i]!;
      }

      return Literal(token.start, token.end, value);
    }
    default:
      return error(token);
  }
};
