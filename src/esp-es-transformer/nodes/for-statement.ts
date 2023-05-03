import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformForStatement = (node: ESP.ForStatement) => {
  return injectSourceRange(
    node,
    ES.ForStatement(
      node.init ? transform(node.init) : null,
      node.test ? transform(node.test) : null,
      node.update ? transform(node.update) : null,
      transform(node.body),
    ),
  );
};
