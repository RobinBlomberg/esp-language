import { ES } from '../../../es';
import { ThrowStatement } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformThrowStatement = (node: ThrowStatement) => {
  return injectSourceRange(
    node,
    ES.AST.ThrowStatement(transform(node.argument)),
  );
};
