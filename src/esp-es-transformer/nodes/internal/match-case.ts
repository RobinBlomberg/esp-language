import { ES } from '../../../es-ast';
import { ESP } from '../../../esp-parser';
import { transform } from '../../transform';
import { withSourceRange } from '../../with-source-range';

export const transformMatchCase = (node: ESP.MatchCase) => {
  if (node.test.type === ESP.NodeType.UnionClause) {
    const length = node.test.values.length;

    return node.test.values.map((value, index) => {
      return withSourceRange(
        value,
        ES.SwitchCase(
          transform(value),
          index === length - 1
            ? [transform(node.consequent), ES.BreakStatement(null)]
            : [],
        ),
      );
    });
  }

  return [
    withSourceRange(
      node,
      ES.SwitchCase(transform(node.test), [
        transform(node.consequent),
        ES.BreakStatement(null),
      ]),
    ),
  ];
};
