import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformStatement } from './statement';

export const transformBlockStatement = (node: ESP.BlockStatement) => {
  return ES.BlockStatement(node.body.map(transformStatement));
};
