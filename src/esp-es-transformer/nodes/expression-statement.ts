import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformExpressionStatement = (node: ESP.ExpressionStatement) => {
  return injectSourceRange(
    node,
    ES.ExpressionStatement(transform(node.expression)),
  );
};
