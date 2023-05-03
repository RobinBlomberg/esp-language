import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformUpdateExpression = (node: IR.UpdateExpression) => {
  return injectSourceRange(
    node,
    ES.UpdateExpression(node.operator, transform(node.argument), node.prefix),
  );
};
