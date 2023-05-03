import { PropertyDefinition } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ClassElement[Yield, Await] :
 *   ...
 *   FieldDefinition[?Yield, ?Await] ;
 *   static FieldDefinition[?Yield, ?Await] ;
 *   ...
 *
 * FieldDefinition[Yield, Await] :
 *   ClassElementName[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]<opt>
 *
 * ClassElementName[Yield, Await] :
 *   PropertyName[?Yield, ?Await]
 *   PrivateIdentifier
 *
 * PropertyName[Yield, Await] :
 *   LiteralPropertyName
 *   ComputedPropertyName[?Yield, ?Await]
 *
 * ComputedPropertyName[Yield, Await] :
 *   [ AssignmentExpression[+In, ?Yield, ?Await] ]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-FieldDefinition
 */
export const writePropertyDefinition: Writer<PropertyDefinition> = (
  node,
  write,
) => {
  if (node.static) {
    write('static');
  }

  if (node.computed) {
    write('[');
    write(node.key);
    write(']');
  } else {
    write(node.key);
  }

  if (node.value) {
    write('=');
    write(node.value);
  }

  write(';');
};
