import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';

export const transformReturnStatement = (node: ESP.ReturnStatement) => {
  return ES.ReturnStatement(transformExpression(node.argument));
};
