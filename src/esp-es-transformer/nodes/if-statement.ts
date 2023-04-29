import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformIfStatement = (node: ESP.IfStatement) => {
  return withSourceRange(
    node,
    ES.IfStatement(
      transform(node.test),
      transform(node.consequent),
      node.alternate ? transform(node.alternate) : null,
    ),
  );
};
