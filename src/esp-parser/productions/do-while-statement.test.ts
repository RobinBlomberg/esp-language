import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseDoWhileStatement } from './do-while-statement';

const { error, ok, unused } = createParseAssert(parseDoWhileStatement);

suite('DoWhileStatement', () => {
  test('"do Statement while ( Expression ) ;"', () => {
    unused();
    ok('do Statement; while (Expression);');
    error('do');
    error('do Statement');
    error('do Statement;');
    error('do Statement; while');
    error('do Statement; while (');
    error('do Statement; while (Expression');
    error('do Statement; while (Expression)');
  });
});
