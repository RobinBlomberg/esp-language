import { ES } from '../../../es';
import { SetLiteral } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';

export const transformSetLiteral = (node: SetLiteral) => {
  return injectSourceRange(
    node,
    ES.AST.NewExpression(ES.AST.Identifier('Set'), [
      ES.AST.ArrayExpression(node.values.map(transform)),
    ]),
  );
};
