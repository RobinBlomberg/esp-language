import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformProperty } from './internal/property';

export const transformObjectLiteral = (node: ESP.ObjectLiteral) => {
  return ES.ObjectExpression(node.properties.map(transformProperty));
};
