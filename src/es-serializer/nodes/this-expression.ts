import { ThisExpression } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * PrimaryExpression[Yield, Await] :
 *   this
 *   ...
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-PrimaryExpression
 */
export const writeThisExpression: Writer<ThisExpression> = (node, write) => {
  write('this');
};
