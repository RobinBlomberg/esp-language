import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';

export const transformThrowStatement = (node: ESP.ThrowStatement) => {
  return ES.ThrowStatement(transformExpression(node.argument));
};
