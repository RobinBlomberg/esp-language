import { ES } from '../../../es';
import { IfStatement } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformIfStatement = (node: IfStatement) => {
  return injectSourceRange(
    node,
    ES.AST.IfStatement(
      transform(node.test),
      transform(node.consequent),
      node.alternate ? transform(node.alternate) : null,
    ),
  );
};
