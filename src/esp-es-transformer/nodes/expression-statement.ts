import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';

export const transformExpressionStatement = (node: ESP.ExpressionStatement) => {
  return ES.ExpressionStatement(transformExpression(node.expression));
};
