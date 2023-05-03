import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformVariableDeclaration = (node: ESP.VariableDeclaration) => {
  return injectSourceRange(
    node,
    ES.VariableDeclaration(
      [ES.VariableDeclarator(transform(node.id), transform(node.init))],
      node.kind,
    ),
  );
};
