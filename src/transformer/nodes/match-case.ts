import { ES } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';
import { transformStatement } from './statement';

export const transformMatchCase = (node: ESP.MatchCase) => {
  if (node.test.type === ESP.NodeType.UnionClause) {
    const length = node.test.values.length;

    return node.test.values.map((value, index) => {
      return ES.SwitchCase(
        transformExpression(value),
        index === length - 1 ? [transformStatement(node.consequent)] : [],
      );
    });
  }

  return [
    ES.SwitchCase(transformExpression(node.test), [
      transformStatement(node.consequent),
    ]),
  ];
};
