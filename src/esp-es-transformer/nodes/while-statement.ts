import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformWhileStatement = (node: ESP.WhileStatement) => {
  return injectSourceRange(
    node,
    ES.WhileStatement(transform(node.test), transform(node.body)),
  );
};
