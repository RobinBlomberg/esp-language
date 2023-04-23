import { Class } from '../../../es-ast';
import { Writer } from '../../serialize';

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
export const writeClass: Writer<Class> = (node, write) => {
  write('class');

  if (node.id) {
    write(node.id);
  }

  if (node.superClass) {
    write('extends');
    write(node.superClass);
  }

  write('{');
  write(node.body);
  write('}');
};
