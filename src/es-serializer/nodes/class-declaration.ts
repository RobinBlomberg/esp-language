import { ClassDeclaration } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ClassDeclaration[Yield, Await, Default] :
 *   class BindingIdentifier[?Yield, ?Await] ClassTail[?Yield, ?Await]
 *   [+Default] class ClassTail[?Yield, ?Await]
 *
 * ClassTail[Yield, Await] :
 *   ClassHeritage[?Yield, ?Await]<opt> { ClassBody[?Yield, ?Await]<opt> }
 *
 * ClassHeritage[Yield, Await] :
 *   extends LeftHandSideExpression[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ClassDeclaration
 */
export const writeClassDeclaration: Writer<ClassDeclaration> = (
  node,
  write,
) => {
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
