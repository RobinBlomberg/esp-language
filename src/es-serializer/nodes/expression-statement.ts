import { ExpressionStatement } from '../../es-ast';
import { Writer } from '../serialize';

export const writeExpressionStatement: Writer<ExpressionStatement> = (
  node,
  write,
) => {
  write(node.expression);
  write(';');
};
