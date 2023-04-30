import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformBinaryExpression = (node: ESP.BinaryExpression) => {
  return injectSourceRange(
    node,
    node.operator === '&&' || node.operator === '||' || node.operator === '??'
      ? ES.LogicalExpression(
          node.operator,
          transform(node.left),
          transform(node.right),
        )
      : ES.BinaryExpression(
          node.operator,
          transform(node.left),
          transform(node.right),
        ),
  );
};
