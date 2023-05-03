import { Node } from '../../../ast';
import { Write } from '../../serialize';

/**
 * ```ecmarkup
 * AsyncGeneratorMethod[Yield, Await] :
 *   async [no LineTerminator here] * ClassElementName[?Yield, ?Await]
 *     ( UniqueFormalParameters[+Yield, +Await] ) { AsyncGeneratorBody }
 *
 * AsyncMethod[Yield, Await] :
 *   async [no LineTerminator here] ClassElementName[?Yield, ?Await]
 *     ( UniqueFormalParameters[~Yield, +Await] ) { AsyncFunctionBody }
 *
 * CoverParenthesizedExpressionAndArrowParameterList[Yield, Await] :
 *   ( Expression[+In, ?Yield, ?Await] )
 *   ( Expression[+In, ?Yield, ?Await] , )
 *   ( )
 *   ( ... BindingIdentifier[?Yield, ?Await] )
 *   ( ... BindingPattern[?Yield, ?Await] )
 *   ( Expression[+In, ?Yield, ?Await] , ... BindingIdentifier[?Yield, ?Await] )
 *   ( Expression[+In, ?Yield, ?Await] , ... BindingPattern[?Yield, ?Await] )
 *
 * GeneratorMethod[Yield, Await] :
 *   ClassElementName[?Yield, ?Await] ( UniqueFormalParameters[+Yield, ~Await] ) { GeneratorBody }
 *
 * FunctionDeclaration[Yield, Await, Default] :
 *   function BindingIdentifier[?Yield, ?Await] ( FormalParameters[~Yield, ~Await] )
 *     { FunctionBody[~Yield, ~Await] }
 *   [+Default] function ( FormalParameters[~Yield, ~Await] ) { FunctionBody[~Yield, ~Await] }
 *
 * FunctionExpression :
 *   function BindingIdentifier[~Yield, ~Await]<opt> ( FormalParameters[~Yield, ~Await] )
 *     { FunctionBody[~Yield, ~Await] }
 *
 * MethodDefinition[Yield, Await] :
 *   ClassElementName[?Yield, ?Await] ( UniqueFormalParameters[~Yield, ~Await] )
 *     { FunctionBody[~Yield, ~Await] }
 *   ...
 *   get ClassElementName[?Yield, ?Await] ( ) { FunctionBody[~Yield, ~Await] }
 *   set ClassElementName[?Yield, ?Await] ( PropertySetParameterList )
 *     { FunctionBody[~Yield, ~Await] }
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-AsyncGeneratorMethod
 * @see https://tc39.es/ecma262/#prod-AsyncMethod
 * @see https://tc39.es/ecma262/#prod-CoverParenthesizedExpressionAndArrowParameterList
 * @see https://tc39.es/ecma262/#prod-FunctionDeclaration
 * @see https://tc39.es/ecma262/#prod-FunctionExpression
 * @see https://tc39.es/ecma262/#prod-GeneratorMethod
 * @see https://tc39.es/ecma262/#prod-MethodDefinition
 */
export const writeParenthesizedList = (elements: Node[], write: Write) => {
  write('(');

  for (let i = 0; i < elements.length; i++) {
    if (i >= 1) {
      write(',');
    }

    write(elements[i]!);
  }

  write(')');
};
