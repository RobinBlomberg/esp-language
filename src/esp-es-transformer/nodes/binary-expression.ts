import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformBinaryExpression = (node: ESP.BinaryExpression) => {
  return withSourceRange(
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
