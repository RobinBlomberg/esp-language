import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformBinaryExpression = (node: ESP.BinaryExpression) => {
  if (
    node.operator === '&&' ||
    node.operator === '||' ||
    node.operator === '??'
  ) {
    return ES.LogicalExpression(
      node.operator,
      transform(node.left),
      transform(node.right),
    );
  }

  return ES.BinaryExpression(
    node.operator,
    transform(node.left),
    transform(node.right),
  );
};
