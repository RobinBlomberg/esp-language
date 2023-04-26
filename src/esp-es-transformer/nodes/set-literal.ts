import { ES } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transformExpression } from './expression';

export const transformSetLiteral = (node: ESP.SetLiteral) => {
  return ES.NewExpression(ES.Identifier('Set'), [
    ES.ArrayExpression(node.values.map(transformExpression)),
  ]);
};
