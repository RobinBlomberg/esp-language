import { ES, SwitchCase } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';
import { transformMatchCase } from './match-case';
import { transformStatement } from './statement';

export const transformMatchStatement = (node: ESP.MatchStatement) => {
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
