import { error, lex, Parser, TokenType } from '../../esp-lexer';
import { IR } from '../../ir-ast';

export const parseLiteral: Parser<IR.Literal> = (data, i) => {
  const token = lex(data, i);
  if (token.abrupt) return token;

  switch (token.type) {
    case TokenType.Keyword:
      switch (token.value) {
        case 'false':
          return IR.Literal(token.start, token.end, false);
        case 'Infinity':
          return IR.Literal(token.start, token.end, Infinity);
        case 'NaN':
          return IR.Literal(token.start, token.end, NaN);
        case 'null':
          return IR.Literal(token.start, token.end, null);
        case 'true':
          return IR.Literal(token.start, token.end, true);
        case 'undefined':
          return IR.Literal(token.start, token.end, undefined);
        default:
          return error(token);
      }
    case TokenType.Number:
      return IR.Literal(token.start, token.end, Number(token.value));
    case TokenType.String: {
      let value = '';

      for (i = 1; i < token.value.length - 1; i++) {
        if (token.value[i] === '\\') {
          i++;
        }

        value += token.value[i]!;
      }

      return IR.Literal(token.start, token.end, value);
    }
    default:
      return error(token);
  }
};
