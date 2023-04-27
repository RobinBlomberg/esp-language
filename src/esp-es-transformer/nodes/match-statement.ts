import { ES, SwitchCase } from '../../es-ast';
import { ESP } from '../../esp-parser';
import { Transformer } from '../transformer-utils';
import { transformExpression } from './expression';
import { transformMatchCase } from './internal/match-case';
import { transformStatement } from './statement';

export const transformMatchStatement: Transformer<ESP.MatchStatement> = (
  node,
) => {
  const cases: SwitchCase[] = [];

  for (const matchCase of node.cases) {
    cases.push(...transformMatchCase(matchCase));
  }

  if (node.alternate) {
    cases.push(
      ES.SwitchCase(null, [
        transformStatement(node.alternate),
        ES.BreakStatement(null),
      ]),
    );
  }

  return ES.SwitchStatement(transformExpression(node.discriminant), cases);
};
