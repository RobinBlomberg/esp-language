import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformUnaryExpression = (node: ESP.UnaryExpression) => {
  return ES.UnaryExpression(node.operator, true, transform(node.argument));
};
