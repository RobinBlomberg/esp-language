import { Literal } from '../../estree';
import { Writer } from '../write';

/**
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
