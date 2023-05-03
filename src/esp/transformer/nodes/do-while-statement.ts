import { ES } from '../../../es';
import { DoWhileStatement } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformDoWhileStatement = (node: DoWhileStatement) => {
  return injectSourceRange(
    node,
    ES.AST.DoWhileStatement(transform(node.body), transform(node.test)),
  );
};
