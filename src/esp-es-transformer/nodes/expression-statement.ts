import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformExpressionStatement = (node: ESP.ExpressionStatement) => {
  return withSourceRange(
    node,
    ES.ExpressionStatement(transform(node.expression)),
  );
};
