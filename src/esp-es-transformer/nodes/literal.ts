import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';

export const transformLiteral = (node: ESP.Literal) => {
  return injectSourceRange(
    node,
    node.value === undefined
      ? ES.Identifier('undefined')
      : ES.Literal(node.value),
  );
};
