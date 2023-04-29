import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformVariableDeclaration = (node: ESP.VariableDeclaration) => {
  return withSourceRange(
    node,
    ES.VariableDeclaration(
      [ES.VariableDeclarator(ES.Identifier(node.id), transform(node.init))],
      node.kind,
    ),
  );
};
