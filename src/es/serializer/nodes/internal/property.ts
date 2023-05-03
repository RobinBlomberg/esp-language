import { AssignmentProperty, NodeType, Property } from '../../../ast';
import { Write } from '../../serialize';
import { writeParenthesizedList } from '../internal/parenthesized-list';

/**
 * ```ecmarkup
 * PropertyDefinition[Yield, Await] :
 *   IdentifierReference[?Yield, ?Await]
 *   CoverInitializedName[?Yield, ?Await]
 *   PropertyName[?Yield, ?Await] : AssignmentExpression[+In, ?Yield, ?Await]
 *   MethodDefinition[?Yield, ?Await]
 *   ... AssignmentExpression[+In, ?Yield, ?Await]
 *
 * PropertyName[Yield, Await] :
 *   LiteralPropertyName
 *   ComputedPropertyName[?Yield, ?Await]
 *
 * MethodDefinition[Yield, Await] :
 *   ClassElementName[?Yield, ?Await] ( UniqueFormalParameters[~Yield, ~Await] ) {
 *     FunctionBody[~Yield, ~Await] }
 *   GeneratorMethod[?Yield, ?Await]
 *   AsyncMethod[?Yield, ?Await]
 *   AsyncGeneratorMethod[?Yield, ?Await]
 *   get ClassElementName[?Yield, ?Await] ( ) { FunctionBody[~Yield, ~Await] }
 *   set ClassElementName[?Yield, ?Await] ( PropertySetParameterList ) {
 *     FunctionBody[~Yield, ~Await] }
 *
 * GeneratorMethod[Yield, Await] :
 *   * ClassElementName[?Yield, ?Await] ( UniqueFormalParameters[+Yield, ~Await] ) { GeneratorBody }
 *
 * AsyncMethod[Yield, Await] :
 *   async [no LineTerminator here] ClassElementName[?Yield, ?Await] (
 *     UniqueFormalParameters[~Yield, +Await] ) { AsyncFunctionBody }
 *
 * AsyncGeneratorMethod[Yield, Await] :
 *   async [no LineTerminator here] * ClassElementName[?Yield, ?Await] (
 *     UniqueFormalParameters[+Yield, +Await] ) { AsyncGeneratorBody }
 *
 * AssignmentProperty[Yield, Await] :
 *   IdentifierReference[?Yield, ?Await] Initializer[+In, ?Yield, ?Await]<opt>
 *   PropertyName[?Yield, ?Await] : AssignmentElement[?Yield, ?Await]
 *
 * Initializer[In, Yield, Await] :
 *   = AssignmentExpression[?In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-PropertyDefinition
 * @see https://tc39.es/ecma262/#prod-AssignmentProperty
 */
export const writeAnyProperty = (
  node: Property | AssignmentProperty,
  write: Write,
) => {
  if (node.method && node.value.type === NodeType.FunctionExpression) {
    if (node.kind === 'init') {
      if (node.value.async) {
        write('async');
      }

      if (node.value.generator) {
        write('*');
      }
    } else {
      write(node.kind);
    }

    write(node.key);

    if (node.value.id) {
      write(node.value.id);
    }

    writeParenthesizedList(node.value.params, write);
    write(node.value.body);
  } else {
    if (node.computed) {
      write('[');
      write(node.key);
      write(']');
    } else {
      write(node.key);
    }

    if (node.shorthand) {
      if (node.value.type === NodeType.AssignmentPattern) {
        write('=');
        write(node.value.right);
      }
    } else {
      write(':');
      write(node.value);
    }
  }
};
