import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';

export const transformReturnStatement = (node: ESP.ReturnStatement) => {
  return ES.ReturnStatement(transformExpression(node.argument));
};
