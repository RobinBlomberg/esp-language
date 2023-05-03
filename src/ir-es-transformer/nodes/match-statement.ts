import { ES, SwitchCase } from '../../es-ast';
import { IR } from '../../ir-ast';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';
import { transformMatchCase } from './internal/match-case';

export const transformMatchStatement = (node: IR.MatchStatement) => {
  const cases: SwitchCase[] = [];

  for (const matchCase of node.cases) {
    cases.push(...transformMatchCase(matchCase));
  }

  if (node.alternate) {
    cases.push(
      injectSourceRange(
        node.alternate,
        ES.SwitchCase(null, [
          transform(node.alternate),
          ES.BreakStatement(null),
        ]),
      ),
    );
  }

  return injectSourceRange(
    node,
    ES.SwitchStatement(transform(node.discriminant), cases),
  );
};
