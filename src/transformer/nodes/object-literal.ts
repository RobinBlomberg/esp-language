import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformProperty } from './property';

export const transformObjectLiteral = (node: ESP.ObjectLiteral) => {
  return ES.ObjectExpression(node.properties.map(transformProperty));
};
