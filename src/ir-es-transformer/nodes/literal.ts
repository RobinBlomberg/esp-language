import { ES } from '../../es-ast';
import { IR } from '../../ir-ast';
import { injectSourceRange } from '../inject-source-range';

export const transformLiteral = (node: IR.Literal) => {
  return injectSourceRange(
    node,
    node.value === undefined
      ? ES.Identifier('undefined')
      : ES.Literal(node.value),
  );
};
