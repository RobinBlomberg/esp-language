import { ES } from '../../../es';
import { ForStatement } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformForStatement = (node: ForStatement) => {
  return injectSourceRange(
    node,
    ES.AST.ForStatement(
      node.init ? transform(node.init) : null,
      node.test ? transform(node.test) : null,
      node.update ? transform(node.update) : null,
      transform(node.body),
    ),
  );
};
