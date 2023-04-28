import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';

export const transformNewExpression = (node: ESP.NewExpression) => {
  return ES.NewExpression(
    transform(node.callee),
    node.arguments.map(transform),
  );
};
