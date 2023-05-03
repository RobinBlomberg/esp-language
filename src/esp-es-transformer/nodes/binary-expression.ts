import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

const binaryOperatorTransformMap: Record<
  ESP.BinaryOperator,
  ES.BinaryOperator
> = {
  '**': '**',
  '*': '*',
  '/': '/',
  '%': '%',
  '+': '+',
  '-': '-',
  '<<': '<<',
  '>>': '>>',
  '>>>': '>>>',
  '<': '<',
  '>': '>',
  '<=': '<=',
  '>=': '>=',
  '==': '===',
  '!=': '!==',
  '&': '&',
  '^': '^',
  '|': '|',
};

const logicalOperatorTransformMap: Record<
  ESP.LogicalOperator,
  ES.LogicalOperator
> = {
  '&&': '&&',
  '||': '||',
  '??': '??',
};

export const transformBinaryExpression = (node: ESP.BinaryExpression) => {
  return injectSourceRange(
    node,
    ESP.isLogicalOperator(node.operator)
      ? ES.LogicalExpression(
          logicalOperatorTransformMap[node.operator],
          transform(node.left),
          transform(node.right),
        )
      : ES.BinaryExpression(
          binaryOperatorTransformMap[node.operator],
          transform(node.left),
          transform(node.right),
        ),
  );
};
