import { ES } from '../../../es-ast';
import { ESP } from '../../../esp-parser';
import { transformExpression } from '../expression';
import { transformStatement } from '../statement';

export const transformMatchCase = (node: ESP.MatchCase) => {
  if (node.test.type === ESP.NodeType.UnionClause) {
    const length = node.test.values.length;

    return node.test.values.map((value, index) => {
      return ES.SwitchCase(
        transformExpression(value),
        index === length - 1
          ? [transformStatement(node.consequent), ES.BreakStatement(null)]
          : [],
      );
    });
  }

  return [
    ES.SwitchCase(transformExpression(node.test), [
      transformStatement(node.consequent),
      ES.BreakStatement(null),
    ]),
  ];
};
