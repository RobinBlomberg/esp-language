import { Literal } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * Literal :
 *   NullLiteral
 *   BooleanLiteral
 *   NumericLiteral
 *   StringLiteral
 *
 * NullLiteral ::
 *   null
 *
 * BooleanLiteral ::
 *   true
 *   false
 *
 * NumericLiteral ::
 *   DecimalLiteral
 *   DecimalBigIntegerLiteral
 *   NonDecimalIntegerLiteral[+Sep]
 *   NonDecimalIntegerLiteral[+Sep] BigIntLiteralSuffix
 *   LegacyOctalIntegerLiteral
 *
 * StringLiteral ::
 *   " DoubleStringCharacters<opt> "
 *   ' SingleStringCharacters<opt> '
 *
 * DoubleStringCharacters ::
 *   DoubleStringCharacter DoubleStringCharacters<opt>
 *
 * DoubleStringCharacter ::
 *   SourceCharacter but not one of " or \ or LineTerminator
 *   <LS>
 *   <PS>
 *   \ EscapeSequence
 *   LineContinuation
 *
 * RegularExpressionLiteral ::
 *   / RegularExpressionBody / RegularExpressionFlags
 * ```
 *
 * ```markdown
 *
 * | Code Point | Unicode Name        | Abbreviation |
 * |------------|---------------------|--------------|
 * | U+2028     | LINE SEPARATOR      | <LS>         |
 * | U+2029     | PARAGRAPH SEPARATOR | <PS>         |
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Literal
 * @see https://tc39.es/ecma262/#table-line-terminator-code-points
 */
export const writeLiteral: Writer<Literal> = (node, write) => {
  switch (typeof node.value) {
    case 'bigint':
      write(`${node.value}n`);
      break;
    case 'boolean':
      write(node.value ? 'true' : 'false');
      break;
    case 'number':
      write(node.value.toString());
      break;
    case 'object':
      if (node.value instanceof RegExp) {
        write(`/${node.value.source}/${node.value.flags}`);
      } else {
        write('null');
      }
      break;
    case 'string':
      write(`"${node.value.replace(/"/g, '\\"')}"`);
      break;
    default:
  }
};
