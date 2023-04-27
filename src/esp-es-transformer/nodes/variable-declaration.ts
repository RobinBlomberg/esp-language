import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformVariableDeclaration: Transformer<
  ESP.VariableDeclaration
> = (node) => {
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
