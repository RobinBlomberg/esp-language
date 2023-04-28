import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformVariableDeclaration = (node: ESP.VariableDeclaration) => {
  return ES.VariableDeclaration(
    [ES.VariableDeclarator(ES.Identifier(node.id), transform(node.init))],
    node.kind,
  );
};
