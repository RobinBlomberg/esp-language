import { ES } from '../../../es';
import { VariableDeclaration } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformVariableDeclaration = (node: VariableDeclaration) => {
  return injectSourceRange(
    node,
    ES.AST.VariableDeclaration(
      [ES.AST.VariableDeclarator(transform(node.id), transform(node.init))],
      node.kind,
    ),
  );
};
