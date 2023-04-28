import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformCallExpression = (node: ESP.CallExpression) => {
  return ES.CallExpression(
    transform(node.callee),
    node.arguments.map(transform),
    false,
  );
};
