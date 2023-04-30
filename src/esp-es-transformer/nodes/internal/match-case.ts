import { ES } from '../../../es-ast';
import { ESP } from '../../../esp-parser';
import { injectSourceRange } from '../../inject-source-range';
import { transform } from '../../transform';

export const transformMatchCase = (node: ESP.MatchCase) => {
  if (node.test.type === ESP.NodeType.UnionClause) {
    const length = node.test.values.length;

    return node.test.values.map((value, index) => {
      return injectSourceRange(
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
    injectSourceRange(
      node,
      ES.SwitchCase(transform(node.test), [
        transform(node.consequent),
        ES.BreakStatement(null),
      ]),
    ),
  ];
};
