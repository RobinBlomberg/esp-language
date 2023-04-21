import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';

export const transformThrowStatement = (node: ESP.ThrowStatement) => {
  return ES.ThrowStatement(transformExpression(node.argument));
};
