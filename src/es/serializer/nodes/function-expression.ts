import { FunctionExpression } from '../../ast';
import { Writer } from '../serialize';
import { writeFunction } from './internal/function';

/**
 * ```ecmarkup
 * FunctionExpression :
 *   function BindingIdentifier[~Yield, ~Await]<opt> ( FormalParameters[~Yield, ~Await] ) {
 *     FunctionBody[~Yield, ~Await] }
 *
 * AsyncFunctionExpression :
 *   async [no LineTerminator here] function BindingIdentifier[~Yield, +Await]<opt> (
 *     FormalParameters[~Yield, +Await] ) { AsyncFunctionBody }
 *
 * GeneratorExpression :
 *   function * BindingIdentifier[+Yield, ~Await]<opt> ( FormalParameters[+Yield, ~Await] ) {
 *     GeneratorBody }
 *
 * AsyncGeneratorExpression :
 *   async [no LineTerminator here] function * BindingIdentifier[+Yield, +Await]<opt> (
 *     FormalParameters[+Yield, +Await] ) { AsyncGeneratorBody }
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-FunctionExpression
 * @see https://tc39.es/ecma262/#prod-AsyncFunctionExpression
 * @see https://tc39.es/ecma262/#prod-AsyncGeneratorExpression
 * @see https://tc39.es/ecma262/#prod-GeneratorExpression
 */
export const writeFunctionExpression: Writer<FunctionExpression> = (
  node,
  write,
) => {
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
