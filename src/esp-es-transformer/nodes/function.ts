import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformFunction = (node: ESP.Function) => {
  return ES.ArrowFunctionExpression(
    null,
    node.params.map(transform),
    transform(node.body),
    false,
    false,
  );
};
