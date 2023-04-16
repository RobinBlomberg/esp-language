import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';

export const transformBinaryExpression = (node: ESP.BinaryExpression) => {
  if (
    node.operator === '&&' ||
    node.operator === '||' ||
    node.operator === '??'
  ) {
    return ES.LogicalExpression(
      node.operator,
      transformExpression(node.left),
      transformExpression(node.right),
    );
  }

  return ES.BinaryExpression(
    node.operator,
    transformExpression(node.left),
    transformExpression(node.right),
  );
};
