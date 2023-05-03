import { ES } from '../../es-ast';
import { ESP } from '../../esp-grammar';
import { injectSourceRange } from '../inject-source-range';
import { transformProperty } from './internal/property';

export const transformObjectLiteral = (node: ESP.ObjectLiteral) => {
  return injectSourceRange(
    node,
    ES.ObjectExpression(node.properties.map(transformProperty)),
  );
};
