import { MetaProperty } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * MetaProperty :
 *   NewTarget
 *   ImportMeta
 *
 * NewTarget :
 *   new . target
 *
 * ImportMeta :
 *   import . meta
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-MetaProperty
 */
export const writeMetaProperty: Writer<MetaProperty> = (node, write) => {
  write(node.meta);
  write('.');
  write(node.property);
};
