import { ES } from '../../../es';
import { BlockStatement } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformBlockStatement = (node: BlockStatement) => {
  return injectSourceRange(
    node,
    ES.AST.BlockStatement(node.body.map(transform)),
  );
};
