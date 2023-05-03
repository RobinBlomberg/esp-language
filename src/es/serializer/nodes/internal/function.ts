import {
  Expression,
  FunctionBody,
  Pattern,
  PrivateIdentifier,
} from '../../../ast';
import { Write } from '../../serialize';
import { writeParenthesizedList } from './parenthesized-list';

/**
 * ```ecmarkup
 * AsyncFunctionExpression :
 *   async [no LineTerminator here] function BindingIdentifier[~Yield, +Await]<opt> (
 *     FormalParameters[~Yield, +Await] ) { AsyncFunctionBody }
 *
 * AsyncGeneratorExpression :
 *   async [no LineTerminator here] function * BindingIdentifier[+Yield, +Await]<opt> (
 *     FormalParameters[+Yield, +Await] ) { AsyncGeneratorBody }
 *
 * FunctionDeclaration[Yield, Await, Default] :
 *   function BindingIdentifier[?Yield, ?Await] ( FormalParameters[~Yield, ~Await] )
 *     { FunctionBody[~Yield, ~Await] }
 *   [+Default] function ( FormalParameters[~Yield, ~Await] ) { FunctionBody[~Yield, ~Await] }
 *
 * FunctionExpression :
 *   function BindingIdentifier[~Yield, ~Await]<opt> ( FormalParameters[~Yield, ~Await] ) {
 *     FunctionBody[~Yield, ~Await] }
 *
 * GeneratorExpression :
 *   function * BindingIdentifier[+Yield, ~Await]<opt> ( FormalParameters[+Yield, ~Await] ) {
 *     GeneratorBody }
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-AsyncFunctionExpression
 * @see https://tc39.es/ecma262/#prod-AsyncGeneratorExpression
 * @see https://tc39.es/ecma262/#prod-FunctionDeclaration
 * @see https://tc39.es/ecma262/#prod-FunctionExpression
 * @see https://tc39.es/ecma262/#prod-GeneratorExpression
 */
export const writeFunction = (
  async: boolean,
  functionKeyword: boolean,
  generator: boolean,
  id: Expression | PrivateIdentifier | null,
  computed: boolean,
  params: Pattern[],
  body: FunctionBody,
  write: Write,
) => {
  if (async) {
    write('async');
  }

  if (functionKeyword) {
    write('function');
  }

  if (generator) {
    write('*');
  }

  if (id) {
    if (computed) {
      write('[');
      write(id);
      write(']');
    } else {
      write(id);
    }
  }

  writeParenthesizedList(params, write);
  write(body);
};
