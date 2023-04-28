import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformBlockStatement = (node: ESP.BlockStatement) => {
  return ES.BlockStatement(node.body.map(transform));
};
