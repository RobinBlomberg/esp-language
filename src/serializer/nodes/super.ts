import { Super } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * SuperCall[Yield, Await] :
 *   super Arguments[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-SuperCall
 */
export const writeSuper: Writer<Super> = (node, write) => {
  write('super');
};
