import { ES } from '../../../es';
import { Function } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformFunction = (node: Function) => {
  return injectSourceRange(
    node,
    ES.AST.ArrowFunctionExpression(
      null,
      node.params.map(transform),
      transform(node.body),
      false,
      false,
    ),
  );
};
