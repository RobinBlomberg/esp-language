import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';

export const transformSetLiteral = (node: ESP.SetLiteral) => {
  return withSourceRange(
    node,
    ES.NewExpression(ES.Identifier('Set'), [
      ES.ArrayExpression(node.values.map(transform)),
    ]),
  );
};
