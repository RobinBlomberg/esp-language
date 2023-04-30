import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformVariableDeclaration = (node: ESP.VariableDeclaration) => {
  return injectSourceRange(
    node,
    ES.VariableDeclaration(
      [ES.VariableDeclarator(ES.Identifier(node.id), transform(node.init))],
      node.kind,
    ),
  );
};
