import { Literal } from '../ast';
import { lex } from '../lex';
import { TokenType } from '../token-type';
import { Parser } from '../token-utils';

/**
 * Supported from ECMA-262:
 * ```ecmarkup
 * Literal :
 *   NullLiteral
 *   BooleanLiteral
 *   NumericLiteral
 *   StringLiteral
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Literal
 */
export const parseLiteral: Parser<Literal> = (data, start) => {
  const token = lex(data, start);
  if (!token) return null;

  switch (token.type) {
    case TokenType.Name:
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
          return null;
      }
    case TokenType.Number:
      return Literal(token.start, token.end, Number(token.value));
    case TokenType.String: {
      let value = '';

      for (let i = 1; i < token.value.length - 1; i++) {
        if (token.value[i] === '\\') {
          i++;
        }

        value += token.value[i]!;
      }

      return Literal(token.start, token.end, value);
    }
    default:
      return null;
  }
};
