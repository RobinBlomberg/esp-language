import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformWhileStatement = (node: ESP.WhileStatement) => {
  return ES.WhileStatement(transform(node.test), transform(node.body));
};
