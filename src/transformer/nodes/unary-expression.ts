import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';

export const transformUnaryExpression = (node: ESP.UnaryExpression) => {
  return ES.UnaryExpression(
    node.operator,
    true,
    transformExpression(node.argument),
  );
};
