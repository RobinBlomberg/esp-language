import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';

export const transformVariableDeclaration = (node: ESP.VariableDeclaration) => {
  return ES.VariableDeclaration(
    [
      ES.VariableDeclarator(
        ES.Identifier(node.id),
        transformExpression(node.init),
      ),
    ],
    'let',
  );
};
