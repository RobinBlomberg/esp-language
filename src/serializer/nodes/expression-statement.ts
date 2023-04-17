import { ExpressionStatement } from '../../estree';
import { Writer } from '../write';

export const writeExpressionStatement: Writer<ExpressionStatement> = (
  node,
  write,
) => {
  write(node.expression);
  write(';');
};
