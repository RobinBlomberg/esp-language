import { ES } from '../../../es';
import { ForOfStatement } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformForOfStatement = (node: ForOfStatement) => {
  return injectSourceRange(
    node,
    ES.AST.ForOfStatement(
      transform(node.left),
      transform(node.right),
      transform(node.body),
      false,
    ),
  );
};
