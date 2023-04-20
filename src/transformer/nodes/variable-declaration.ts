import { ES } from '../../estree';
import { ESP } from '../../parser';
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
