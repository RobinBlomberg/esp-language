import { SequenceExpression } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * Expression[In, Yield, Await] :
 *   AssignmentExpression[?In, ?Yield, ?Await]
 *   Expression[?In, ?Yield, ?Await] , AssignmentExpression[?In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Expression
 */
export const writeSequenceExpression: Writer<SequenceExpression> = (
  node,
  write,
) => {
  for (let i = 0; i < node.expressions.length; i++) {
    if (i > 0) {
      write(',');
    }

    write(node.expressions[i]!);
  }
};
