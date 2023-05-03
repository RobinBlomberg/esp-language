import { ES } from '../../../../es';
import { MatchCase } from '../../../grammar';
import { injectSourceRange } from '../../inject-source-range';
import { transform } from '../../transform';

export const transformMatchCase = (node: MatchCase) => {
  const lastIndex = node.tests.length - 1;

  return node.tests.map((value, index) => {
    return injectSourceRange(
      value,
      ES.AST.SwitchCase(
        transform(value),
        index === lastIndex
          ? [transform(node.consequent), ES.AST.BreakStatement(null)]
          : [],
      ),
    );
  });
};
