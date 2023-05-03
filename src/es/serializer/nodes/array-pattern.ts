import { ArrayPattern } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ArrayAssignmentPattern[Yield, Await] :
 *   [ Elision<opt> AssignmentRestElement[?Yield, ?Await]<opt> ]
 *   [ AssignmentElementList[?Yield, ?Await] ]
 *   [ AssignmentElementList[?Yield, ?Await] , Elision<opt>
 *     AssignmentRestElement[?Yield, ?Await]<opt> ]
 *
 * Elision :
 *   ,
 *   Elision ,
 *
 * AssignmentRestElement[Yield, Await] :
 *   ... DestructuringAssignmentTarget[?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ArrayAssignmentPattern
 */
export const writeArrayPattern: Writer<ArrayPattern> = (node, write) => {
  write('[');

  for (let i = 0, isAfterElision = false; i < node.elements.length; i++) {
    const element = node.elements[i];

    if (i >= 1 && !isAfterElision) {
      write(',');
    }

    if (element) {
      write(element);
    } else {
      write(',');
    }

    isAfterElision = !element;
  }

  write(']');
};
