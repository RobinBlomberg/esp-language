import { ES } from '../../../es';
import { ReturnStatement } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformReturnStatement = (node: ReturnStatement) => {
  return injectSourceRange(
    node,
    ES.AST.ReturnStatement(transform(node.argument)),
  );
};
