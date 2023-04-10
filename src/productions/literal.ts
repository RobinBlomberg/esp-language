import { lex } from '../lex';
import * as ast from '../node-factory';
import { LiteralNode } from '../nodes';
import { TokenType as tt } from '../token-type';

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
export const parseLiteral = (
  data: string,
  start: number,
): LiteralNode | null => {
  const token = lex(data, start);
  if (!token) return null;

  switch (token.type) {
    case tt.Name:
      switch (token.value) {
        case 'false':
          return ast.literal(token.start, token.end, false);
        case 'Infinity':
          return ast.literal(token.start, token.end, Infinity);
        case 'NaN':
          return ast.literal(token.start, token.end, NaN);
        case 'null':
          return ast.literal(token.start, token.end, null);
        case 'true':
          return ast.literal(token.start, token.end, true);
        case 'undefined':
          return ast.literal(token.start, token.end, undefined);
        default:
          return null;
      }
    case tt.Number:
      return ast.literal(token.start, token.end, Number(token.value));
    case tt.String:
      let value = '';

      for (let start = 1; start < token.value.length - 1; start++) {
        if (token.value[start] === '\\') {
          start++;
        }

        value += token.value[start];
      }

      return ast.literal(token.start, token.end, value);
    default:
      return null;
  }
};
