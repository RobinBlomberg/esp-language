import {
  Expression,
  PrivateIdentifier,
  SpreadElement,
  Super,
} from '../../../es-ast';
import { getExpressionPrecedence } from '../../get-expression-precedence';
import { Write } from '../../serialize';

/**
 * ```ecmarkup
 * ClassDeclaration[Yield, Await, Default] :
 *   class BindingIdentifier[?Yield, ?Await] ClassTail[?Yield, ?Await]
 *   [+Default] class ClassTail[?Yield, ?Await]
 *
 * ClassExpression[Yield, Await] :
 *   class BindingIdentifier[?Yield, ?Await]<opt> ClassTail[?Yield, ?Await]
 *
 * ClassTail[Yield, Await] :
 *   ClassHeritage[?Yield, ?Await]<opt> { ClassBody[?Yield, ?Await]<opt> }
 *
 * ClassHeritage[Yield, Await] :
 *   extends LeftHandSideExpression[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ClassDeclaration
 * @see https://tc39.es/ecma262/#prod-ClassExpression
 */
export const writeExpression = (
  parentNode: Expression,
  node: Expression | PrivateIdentifier | SpreadElement | Super,
  write: Write,
) => {
  if (getExpressionPrecedence(node) <= getExpressionPrecedence(parentNode)) {
    write('(');
    write(node);
    write(')');
  } else {
    write(node);
  }
};
