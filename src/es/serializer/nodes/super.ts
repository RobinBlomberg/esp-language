import { Super } from '../../ast';
import { Writer } from '../serialize';

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
