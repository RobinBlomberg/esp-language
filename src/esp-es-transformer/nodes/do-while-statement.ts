import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformDoWhileStatement = (node: ESP.DoWhileStatement) => {
  return ES.DoWhileStatement(transform(node.body), transform(node.test));
};
