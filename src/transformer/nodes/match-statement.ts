import { ES, SwitchCase } from '../../estree';
import { ESP } from '../../parser';
import { transformExpression } from './expression';
import { transformMatchCase } from './match-case';

export const transformMatchStatement = (node: ESP.MatchStatement) => {
  const cases: SwitchCase[] = [];

  for (const matchCase of node.cases) {
    cases.push(...transformMatchCase(matchCase));
  }

  return ES.SwitchStatement(transformExpression(node.discriminant), cases);
};
