import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformStatement } from './statement';

export const transformBlockStatement = (node: ESP.BlockStatement) => {
  return ES.BlockStatement(node.body.map(transformStatement));
};
