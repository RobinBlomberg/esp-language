import { ES } from '../../../es';
import { ObjectLiteral } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transformProperty } from './internal/property';

export const transformObjectLiteral = (node: ObjectLiteral) => {
  return injectSourceRange(
    node,
    ES.AST.ObjectExpression(node.properties.map(transformProperty)),
  );
};
