import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseMatchStatement } from './match-statement';

const { error, ok, unused } = createParseAssert(parseMatchStatement);

suite('MatchStatement', () => {
  test('"match ( Expression ) ExpressionBlock"', () => {
    unused();
    ok('match (Expression) { Expression Statement; }');
    ok('match (Expression) { Expression Statement; Expression Statement; }');
    ok('match (Expression) { Expression Statement; else Statement; }');
    ok(
      'match (Expression) { Expression Statement; Expression Statement; else Statement; }',
    );
    ok('match (Expression) { {Union, Clause} Block; }');
    error('match');
    error('match (');
    error('match (Expression');
    error('match (Expression)');
    error('match (Expression) {');
    error('match (Expression) { Expression');
    error('match (Expression) { Expression Statement');
    error('match (Expression) { Expression Statement;');
    error('match (Expression) { Expression Statement; Expression');
    error('match (Expression) { Expression Statement; else');
    error('match (Expression) { Expression Statement; Expression Statement');
    error('match (Expression) { Expression Statement; Expression Statement;');
    error('match (Expression) { Expression Statement; else Statement');
    error('match (Expression) { Expression Statement; else Statement;');
    error('match (Expression) { {Union');
    error('match (Expression) { {Union}');
    error('match (Expression) { {Union, }');
    error('match (Expression) { {Union, Clause');
    error('match (Expression) { {Union, Clause}');
    error('match (Expression) { {Union, Clause} }');
    error('match (Expression) { {Union, Clause} Block;');
    error('match (Expression) { {Union, Clause} Block }');
  });
});
