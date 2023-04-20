import { FunctionExpression } from '../../estree';
import { Writer } from '../write';

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
  if (node.async) {
    write('async');
  }

  write('function');

  if (node.generator) {
    write('*');
  }

  if (node.id) {
    write(node.id);
  }

  write('(');

  for (let i = 0; i < node.params.length; i++) {
    if (i >= 1) {
      write(',');
    }

    write(node.params[i]!);
  }

  write(')');
  write(node.body);
};
