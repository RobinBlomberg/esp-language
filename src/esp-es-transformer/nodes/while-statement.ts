import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformWhileStatement = (node: ESP.WhileStatement) => {
  return withSourceRange(
    node,
    ES.WhileStatement(transform(node.test), transform(node.body)),
  );
};
