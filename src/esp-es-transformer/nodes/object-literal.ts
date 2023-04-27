import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformProperty } from './internal/property';

export const transformObjectLiteral: Transformer<ESP.ObjectLiteral> = (
  node,
) => {
  return ES.ObjectExpression(node.properties.map(transformProperty));
};
