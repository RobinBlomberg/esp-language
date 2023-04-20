import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseMatchStatement } from './match-statement';

const { fail, ok } = createParseAssert(parseMatchStatement);

suite('MatchStatement', () => {
  test('"match ( Expression ) ExpressionBlock"', () => {
    ok('match (Expression) { Expression Statement; }');
    ok('match (Expression) { Expression Statement; Expression Statement; }');
    ok('match (Expression) { Expression Statement; else Statement; }');
    ok(
      'match (Expression) { Expression Statement; Expression Statement; else Statement; }',
    );
    ok('match (Expression) { {Union, Clause} Block; }');
    fail('match');
    fail('match (');
    fail('match (Expression');
    fail('match (Expression)');
    fail('match (Expression) {');
    fail('match (Expression) { Expression');
    fail('match (Expression) { Expression Statement');
    fail('match (Expression) { Expression Statement;');
    fail('match (Expression) { Expression Statement; Expression');
    fail('match (Expression) { Expression Statement; else');
    fail('match (Expression) { Expression Statement; Expression Statement');
    fail('match (Expression) { Expression Statement; Expression Statement;');
    fail('match (Expression) { Expression Statement; else Statement');
    fail('match (Expression) { Expression Statement; else Statement;');
    fail('match (Expression) { {Union');
    fail('match (Expression) { {Union}');
    fail('match (Expression) { {Union, }');
    fail('match (Expression) { {Union, Clause');
    fail('match (Expression) { {Union, Clause}');
    fail('match (Expression) { {Union, Clause} }');
    fail('match (Expression) { {Union, Clause} Block;');
    fail('match (Expression) { {Union, Clause} Block }');
  });
});
