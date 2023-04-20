import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';

export const transformExpressionStatement = (node: ESP.ExpressionStatement) => {
  return ES.ExpressionStatement(transformExpression(node.expression));
};
