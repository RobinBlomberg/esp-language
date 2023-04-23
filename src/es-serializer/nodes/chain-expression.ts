import { ChainExpression } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * Evaluation:
 *   - The `ChainExpression` node is evaluated to the result of the `expression` property's node.
 *   - If the `callee|object` property is evaluated to nullish and the `optional` property is
 *     `true`, then the node and ancestor nodes are skipped until the closest `ChainExpression`
 *     node, and the result of the `ChainExpression` node becomes `undefined`.
 *
 * @see https://github.com/estree/estree/blob/master/es2020.md#chainexpression
 */
export const writeChainExpression: Writer<ChainExpression> = (node, write) => {
  write(node.expression);
};
