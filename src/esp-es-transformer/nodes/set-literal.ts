import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformSetLiteral = (node: ESP.SetLiteral) => {
  return injectSourceRange(
    node,
    ES.NewExpression(ES.Identifier('Set'), [
      ES.ArrayExpression(node.values.map(transform)),
    ]),
  );
};
