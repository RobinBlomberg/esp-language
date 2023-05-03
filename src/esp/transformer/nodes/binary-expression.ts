import { ES } from '../../../es';
import {
  BinaryExpression,
  BinaryOperator,
  LogicalOperator,
  isLogicalOperator,
} from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

const binaryOperatorTransformMap: Record<
  BinaryOperator,
  ES.AST.BinaryOperator
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
  LogicalOperator,
  ES.AST.LogicalOperator
> = {
  '&&': '&&',
  '||': '||',
  '??': '??',
};

export const transformBinaryExpression = (node: BinaryExpression) => {
  return injectSourceRange(
    node,
    isLogicalOperator(node.operator)
      ? ES.AST.LogicalExpression(
          logicalOperatorTransformMap[node.operator],
          transform(node.left),
          transform(node.right),
        )
      : ES.AST.BinaryExpression(
          binaryOperatorTransformMap[node.operator],
          transform(node.left),
          transform(node.right),
        ),
  );
};
