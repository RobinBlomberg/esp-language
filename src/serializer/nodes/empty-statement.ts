import { EmptyStatement } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * EmptyStatement :
 *   ;
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-EmptyStatement
 */
export const writeEmptyStatement: Writer<EmptyStatement> = (node, write) => {
  write(';');
};
