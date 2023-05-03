import { ES } from '../../es-ast';
import { IR } from '../../ir';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformSetLiteral = (node: IR.SetLiteral) => {
  return injectSourceRange(
    node,
    ES.NewExpression(ES.Identifier('Set'), [
      ES.ArrayExpression(node.values.map(transform)),
    ]),
  );
};
