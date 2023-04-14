import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseMatchStatement } from './match-statement';

const { fail, ok } = createParseAssert(parseMatchStatement);

suite('MatchStatement', () => {
  test('"match ( Expression ) CaseBlock"', () => {
    ok('match (Expression) { Case Block; }');
    ok('match (Expression) { Case Block; Case Block; }');
    ok('match (Expression) { Case Block; else Statement; }');
    ok('match (Expression) { Case Block; Case Block; else Statement; }');
    fail('match');
    fail('match (');
    fail('match (Expression');
    fail('match (Expression)');
    fail('match (Expression) {');
    fail('match (Expression) { Case');
    fail('match (Expression) { Case Block');
    fail('match (Expression) { Case Block;');
    fail('match (Expression) { Case Block; Case');
    fail('match (Expression) { Case Block; else');
    fail('match (Expression) { Case Block; Case Block');
    fail('match (Expression) { Case Block; Case Block;');
    fail('match (Expression) { Case Block; else Statement');
    fail('match (Expression) { Case Block; else Statement;');
  });
});
