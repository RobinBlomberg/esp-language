import { ES } from '../../../es-ast';
import { ESP } from '../../../esp-parser';
import { injectSourceRange } from '../../inject-source-range';
import { transform } from '../../transform';

export const transformMatchCase = (node: ESP.MatchCase) => {
  const lastIndex = node.tests.length - 1;

  return node.tests.map((value, index) => {
    return injectSourceRange(
      value,
      ES.SwitchCase(
        transform(value),
        index === lastIndex
          ? [transform(node.consequent), ES.BreakStatement(null)]
          : [],
      ),
    );
  });
};
