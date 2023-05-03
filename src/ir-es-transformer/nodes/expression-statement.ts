import { ES } from '../../es-ast';
import { IR } from '../../ir-ast';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformExpressionStatement = (node: IR.ExpressionStatement) => {
  return injectSourceRange(
    node,
    ES.ExpressionStatement(transform(node.expression)),
  );
};
