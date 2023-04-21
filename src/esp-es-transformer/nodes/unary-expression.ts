import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';

export const transformUnaryExpression = (node: ESP.UnaryExpression) => {
  return ES.UnaryExpression(
    node.operator,
    true,
    transformExpression(node.argument),
  );
};
