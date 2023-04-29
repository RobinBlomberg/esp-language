import { ES, SwitchCase } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { transform } from '../transform';
import { withSourceRange } from '../with-source-range';
import { transformMatchCase } from './internal/match-case';

export const transformMatchStatement = (node: ESP.MatchStatement) => {
  const cases: SwitchCase[] = [];

  for (const matchCase of node.cases) {
    cases.push(...transformMatchCase(matchCase));
  }

  if (node.alternate) {
    cases.push(
      withSourceRange(
        node.alternate,
        ES.SwitchCase(null, [
          transform(node.alternate),
          ES.BreakStatement(null),
        ]),
      ),
    );
  }

  return withSourceRange(
    node,
    ES.SwitchStatement(transform(node.discriminant), cases),
  );
};
