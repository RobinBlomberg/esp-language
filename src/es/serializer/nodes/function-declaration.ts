import {
  AnonymousDefaultExportedFunctionDeclaration,
  FunctionDeclaration,
} from '../../ast';
import { Writer } from '../serialize';
import { writeFunction } from './internal/function';

/**
 * ```ecmarkup
 * FunctionDeclaration[Yield, Await, Default] :
 *   function BindingIdentifier[?Yield, ?Await] ( FormalParameters[~Yield, ~Await] )
 *     { FunctionBody[~Yield, ~Await] }
 *   [+Default] function ( FormalParameters[~Yield, ~Await] ) { FunctionBody[~Yield, ~Await] }
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-FunctionDeclaration
 */
export const writeFunctionDeclaration: Writer<
  AnonymousDefaultExportedFunctionDeclaration | FunctionDeclaration
> = (node, write) => {
  writeFunction(
    node.async,
    true,
    node.generator,
    node.id,
    false,
    node.params,
    node.body,
    write,
  );
};
