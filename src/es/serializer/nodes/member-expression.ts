import { MemberExpression } from '../../ast';
import { Writer } from '../serialize';
import { writeExpression } from './internal/expression';

/**
 * ```ecmarkup
 * MemberExpression[Yield, Await] :
 *   ...
 *   MemberExpression[?Yield, ?Await] [ Expression[+In, ?Yield, ?Await] ]
 *   MemberExpression[?Yield, ?Await] . IdentifierName
 *   ...
 *   SuperProperty[?Yield, ?Await]
 *   MetaProperty
 *   ...
 *   MemberExpression[?Yield, ?Await] . PrivateIdentifier
 *
 * SuperProperty[Yield, Await] :
 *   super [ Expression[+In, ?Yield, ?Await] ]
 *   super . IdentifierName
 *
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
 * @see https://tc39.es/ecma262/#prod-MemberExpression
 */
export const writeMemberExpression: Writer<MemberExpression> = (
  node,
  write,
) => {
  writeExpression(node, node.object, write);

  if (node.computed) {
    if (node.optional) {
      write('?.');
    }

    write('[');
    write(node.property);
    write(']');
  } else {
    if (node.optional) {
      write('?');
    }

    write('.');
    writeExpression(node, node.property, write);
  }
};
