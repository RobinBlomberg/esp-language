import { ES } from '../../../es';
import { MatchStatement } from '../../grammar';
import { injectSourceRange } from '../inject-source-range';
import { transform } from '../transform';
import { transformMatchCase } from './internal/match-case';

export const transformMatchStatement = (node: MatchStatement) => {
  const cases: ES.AST.SwitchCase[] = [];

  for (const matchCase of node.cases) {
    cases.push(...transformMatchCase(matchCase));
  }

  if (node.alternate) {
    cases.push(
      injectSourceRange(
        node.alternate,
        ES.AST.SwitchCase(null, [
          transform(node.alternate),
          ES.AST.BreakStatement(null),
        ]),
      ),
    );
  }

  return injectSourceRange(
    node,
    ES.AST.SwitchStatement(transform(node.discriminant), cases),
  );
};
