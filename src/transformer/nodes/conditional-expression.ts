import { ES } from '../../estree';
import { ESP } from '../../parser';
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
