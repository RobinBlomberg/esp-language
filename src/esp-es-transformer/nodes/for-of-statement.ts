import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformForOfStatement = (node: ESP.ForOfStatement) => {
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
