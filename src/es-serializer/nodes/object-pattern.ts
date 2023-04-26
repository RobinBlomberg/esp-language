import { NodeType, ObjectPattern } from '../../es-ast';
import { Writer } from '../serialize';
import { writeAnyProperty } from './internal/property';

/**
 * ```ecmarkup
 * ObjectAssignmentPattern[Yield, Await] :
 *   { }
 *   { AssignmentRestProperty[?Yield, ?Await] }
 *   { AssignmentPropertyList[?Yield, ?Await] }
 *   { AssignmentPropertyList[?Yield, ?Await] , AssignmentRestProperty[?Yield, ?Await]<opt> }
 *
 * AssignmentRestProperty[Yield, Await] :
 *   ... DestructuringAssignmentTarget[?Yield, ?Await]
 *
 * AssignmentPropertyList[Yield, Await] :
 *   AssignmentProperty[?Yield, ?Await]
 *   AssignmentPropertyList[?Yield, ?Await] , AssignmentProperty[?Yield, ?Await]
 *
 * AssignmentProperty[Yield, Await] :
 *   IdentifierReference[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]<opt>
 *   PropertyName[?Yield, ?Await] : AssignmentElement[?Yield, ?Await]
 *
 * DestructuringAssignmentTarget[Yield, Await] :
 *   LeftHandSideExpression[?Yield, ?Await]
 *
 * Initializer[In, Yield, Await] :
 *   = AssignmentExpression[?In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ObjectAssignmentPattern
 */
export const writeObjectPattern: Writer<ObjectPattern> = (node, write) => {
  write('{');

  for (let i = 0; i < node.properties.length; i++) {
    if (i >= 1) {
      write(',');
    }

    const property = node.properties[i]!;

    if (property.type === NodeType.Property) {
      writeAnyProperty(property, write);
    } else {
      write(property);
    }
  }

  write('}');
};
