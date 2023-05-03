import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformWhileStatement = (node: IR.WhileStatement) => {
  return injectSourceRange(
    node,
    ES.WhileStatement(transform(node.test), transform(node.body)),
  );
};
