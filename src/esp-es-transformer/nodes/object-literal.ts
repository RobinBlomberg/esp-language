import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { withSourceRange } from '../with-source-range';
import { transformProperty } from './internal/property';

export const transformObjectLiteral = (node: ESP.ObjectLiteral) => {
  return withSourceRange(
    node,
    ES.ObjectExpression(node.properties.map(transformProperty)),
  );
};
