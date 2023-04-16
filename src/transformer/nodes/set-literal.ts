import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';

export const transformSetLiteral = (node: ESP.SetLiteral) => {
  return ES.NewExpression(
    ES.Identifier('Set'),
    node.values.map(transformExpression),
  );
};
