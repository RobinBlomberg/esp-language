import { MethodDefinition } from '../../ast';
import { Writer } from '../serialize';
import { writeFunction } from './internal/function';

/**
 * ```ecmarkup
 * ClassElement[Yield, Await] :
 *   MethodDefinition[?Yield, ?Await]
 *   static MethodDefinition[?Yield, ?Await]
 *   ...
 *
 * MethodDefinition[Yield, Await] :
 *   ClassElementName[?Yield, ?Await] ( UniqueFormalParameters[~Yield, ~Await] ) {
 *     FunctionBody[~Yield, ~Await] }
 *   GeneratorMethod[?Yield, ?Await]
 *   AsyncMethod[?Yield, ?Await]
 *   AsyncGeneratorMethod[?Yield, ?Await]
 *   get ClassElementName[?Yield, ?Await] ( ) { FunctionBody[~Yield, ~Await] }
 *   set ClassElementName[?Yield, ?Await] ( PropertySetParameterList )
 *     { FunctionBody[~Yield, ~Await] }
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ClassElement
 */
export const writeMethodDefinition: Writer<MethodDefinition> = (
  node,
  write,
) => {
  if (node.static) {
    write('static');
  }

  if (node.kind !== 'method') {
    write(node.kind);
  }

  writeFunction(
    node.value.async,
    false,
    node.value.generator,
    node.key,
    node.computed,
    node.value.params,
    node.value.body,
    write,
  );
  write(';');
};
