import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformReturnStatement = (node: ESP.ReturnStatement) => {
  return ES.ReturnStatement(transform(node.argument));
};
