import { ClassBody } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ClassBody[Yield, Await] :
 *   ClassElementList[?Yield, ?Await]
 *
 * ClassElementList[Yield, Await] :
 *   ClassElement[?Yield, ?Await]
 *   ClassElementList[?Yield, ?Await] ClassElement[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ClassBody
 */
export const writeClassBody: Writer<ClassBody> = (node, write) => {
  for (const element of node.body) {
    write(element);
  }
};
