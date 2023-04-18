import { ArrayPattern } from '../../estree';
import { Writer } from '../write';

/**
 * ```ecmarkup
 * ArrayAssignmentPattern[Yield, Await] :
 *   [ Elision(opt) AssignmentRestElement[?Yield, ?Await](opt) ]
 *   [ AssignmentElementList[?Yield, ?Await] ]
 *   [ AssignmentElementList[?Yield, ?Await] , Elision(opt) AssignmentRestElement[?Yield, ?Await](opt) ]
 * ```
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
