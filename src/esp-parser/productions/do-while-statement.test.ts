import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseDoWhileStatement } from './do-while-statement';

const { fail, ok } = createParseAssert(parseDoWhileStatement);

suite('DoWhileStatement', () => {
  test('"do Statement while ( Expression ) ;"', () => {
    ok('do Statement; while (Expression);');
    fail('do');
    fail('do Statement');
    fail('do Statement;');
    fail('do Statement; while');
    fail('do Statement; while (');
    fail('do Statement; while (Expression');
    fail('do Statement; while (Expression)');
  });
});
