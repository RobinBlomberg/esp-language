import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformVariableDeclaration = (node: IR.VariableDeclaration) => {
  return injectSourceRange(
    node,
    ES.VariableDeclaration(
      [ES.VariableDeclarator(transform(node.id), transform(node.init))],
      node.mutable ? 'let' : 'const',
    ),
  );
};
