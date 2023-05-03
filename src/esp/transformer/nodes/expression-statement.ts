import { ES } from '../../../es';
import { ExpressionStatement } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformExpressionStatement = (node: ExpressionStatement) => {
  return injectSourceRange(
    node,
    ES.AST.ExpressionStatement(transform(node.expression)),
  );
};
