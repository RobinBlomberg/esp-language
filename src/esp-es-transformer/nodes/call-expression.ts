import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';

export const transformCallExpression: Transformer<ESP.CallExpression> = (
  node,
) => {
  return ES.CallExpression(
    transformExpression(node.callee),
    node.arguments.map(transformExpression),
    false,
  );
};
