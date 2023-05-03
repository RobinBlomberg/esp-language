import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transformProperty } from './internal/property';

export const transformObjectLiteral = (node: IR.ObjectLiteral) => {
  return injectSourceRange(
    node,
    ES.ObjectExpression(node.properties.map(transformProperty)),
  );
};
