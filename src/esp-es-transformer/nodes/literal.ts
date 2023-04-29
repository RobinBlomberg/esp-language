import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { withSourceRange } from '../with-source-range';

export const transformLiteral = (node: ESP.Literal) => {
  return withSourceRange(
    node,
    node.value === undefined
      ? ES.Identifier('undefined')
      : ES.Literal(node.value),
  );
};
