import { ES } from '../../es-ast';
import { IR } from '../../ir-ast';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformLoopStatement = (node: IR.LoopStatement) => {
  if (node.test && !node.init && !node.update) {
    return injectSourceRange(
      node,
      ES.WhileStatement(transform(node.test), transform(node.body)),
    );
  }

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
