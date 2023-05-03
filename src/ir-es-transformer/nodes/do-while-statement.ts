import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformDoWhileStatement = (node: IR.DoWhileStatement) => {
  return injectSourceRange(
    node,
    ES.DoWhileStatement(transform(node.body), transform(node.test)),
  );
};
