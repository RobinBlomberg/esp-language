import { ClassExpression } from '../../ast';
import { Writer } from '../serialize';
import { writeClass } from './internal/class';

/**
 * ```ecmarkup
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
 * @see https://tc39.es/ecma262/#prod-ClassExpression
 */
export const writeClassExpression: Writer<ClassExpression> = writeClass;
