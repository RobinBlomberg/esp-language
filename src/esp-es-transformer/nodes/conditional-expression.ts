import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';

export const transformConditionalExpression = (
  node: ESP.ConditionalExpression,
) => {
  return ES.ConditionalExpression(
    transformExpression(node.test),
    transformExpression(node.alternate),
    transformExpression(node.consequent),
  );
};
