import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformIfStatement = (node: ESP.IfStatement) => {
  return injectSourceRange(
    node,
    ES.IfStatement(
      transform(node.test),
      transform(node.consequent),
      node.alternate ? transform(node.alternate) : null,
    ),
  );
};
