import { LabeledStatement } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * LabelledStatement[Yield, Await, Return] :
 *   LabelIdentifier[?Yield, ?Await] : LabelledItem[?Yield, ?Await, ?Return]
 *
 * LabelledItem[Yield, Await, Return] :
 *   Statement[?Yield, ?Await, ?Return]
 *   FunctionDeclaration[?Yield, ?Await, ~Default]
 *
 * LabelIdentifier[Yield, Await] :
 *   Identifier
 *   [~Yield] yield
 *   [~Await] await
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-LabelledStatement
 */
export const writeLabeledStatement: Writer<LabeledStatement> = (
  node,
  write,
) => {
  write(node.label);
  write(':');
  write(node.body);
};
