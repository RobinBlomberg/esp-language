import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformExpressionStatement = (node: ESP.ExpressionStatement) => {
  return ES.ExpressionStatement(transform(node.expression));
};
