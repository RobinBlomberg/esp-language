import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformIfStatement = (node: IR.IfStatement) => {
  return injectSourceRange(
    node,
    ES.IfStatement(
      transform(node.test),
      transform(node.consequent),
      node.alternate ? transform(node.alternate) : null,
    ),
  );
};
