import { Property } from '../../ast';
import { Writer } from '../serialize';
import { writeAnyProperty } from './internal/property';

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
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-PropertyDefinition
 */
export const writeProperty: Writer<Property> = (node, write) => {
  writeAnyProperty(node, write);
};
