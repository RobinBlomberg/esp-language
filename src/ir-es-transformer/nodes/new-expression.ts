import { ES } from '../../es-ast';
import { IR } from '../../ir-ast';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformNewExpression = (node: IR.NewExpression) => {
  return injectSourceRange(
    node,
    ES.NewExpression(transform(node.callee), node.arguments.map(transform)),
  );
};
