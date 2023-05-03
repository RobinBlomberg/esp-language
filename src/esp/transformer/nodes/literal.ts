import { ES } from '../../../es';
import { Literal } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';

export const transformLiteral = (node: Literal) => {
  return injectSourceRange(
    node,
    node.value === undefined
      ? ES.AST.Identifier('undefined')
      : ES.AST.Literal(node.value),
  );
};
