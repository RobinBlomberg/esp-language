import { ES } from '../../../es';
import { WhileStatement } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformWhileStatement = (node: WhileStatement) => {
  return injectSourceRange(
    node,
    ES.AST.WhileStatement(transform(node.test), transform(node.body)),
  );
};
