import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformForOfStatement = (node: IR.ForOfStatement) => {
  return injectSourceRange(
    node,
    ES.ForOfStatement(
      transform(node.left),
      transform(node.right),
      transform(node.body),
      false,
    ),
  );
};
