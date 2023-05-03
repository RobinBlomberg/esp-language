import {
  AnonymousDefaultExportedClassDeclaration,
  ClassDeclaration,
} from '../../ast';
import { Writer } from '../serialize';
import { writeClass } from './internal/class';

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
export const writeClassDeclaration: Writer<
  AnonymousDefaultExportedClassDeclaration | ClassDeclaration
> = writeClass;
