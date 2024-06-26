import { ArrayExpression } from '../../ast';
import { Writer } from '../serialize';
import { writeExpression } from './internal/expression';

/**
 * ```ecmarkup
 * ArrayLiteral[Yield, Await] :
 *   [ Elision<opt> ]
 *   [ ElementList[?Yield, ?Await] ]
 *   [ ElementList[?Yield, ?Await] , Elision<opt> ]
 *
 * ElementList[Yield, Await] :
 *   Elision<opt> AssignmentExpression[+In, ?Yield, ?Await]
 *   Elision<opt> SpreadElement[?Yield, ?Await]
 *   ElementList[?Yield, ?Await] , Elision<opt> AssignmentExpression[+In, ?Yield, ?Await]
 *   ElementList[?Yield, ?Await] , Elision<opt> SpreadElement[?Yield, ?Await]
 *
 * Elision :
 *   ,
 *   Elision ,
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ArrayLiteral
 */
export const writeArrayExpression: Writer<ArrayExpression> = (node, write) => {
  write('[');

  for (let i = 0, isAfterElision = false; i < node.elements.length; i++) {
    const element = node.elements[i];

    if (i >= 1 && !isAfterElision) {
      write(',');
    }

    if (element) {
      writeExpression(node, element, write);
    } else {
      write(',');
    }

    isAfterElision = !element;
  }

  write(']');
};
