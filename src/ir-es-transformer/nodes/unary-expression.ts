import { ES } from '../../es-ast';
import { IR } from '../../ir-ast';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformUnaryExpression = (node: IR.UnaryExpression) => {
  return injectSourceRange(
    node,
    ES.UnaryExpression(node.operator, true, transform(node.argument)),
  );
};
