import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseBlockStatement } from './block-statement';

const { error, ok, unused } = createParseAssert(parseBlockStatement);

suite('BlockStatement', () => {
  test('"{ StatementList<opt> }"', () => {
    unused();
    ok('{}');
    ok('{ Statement; }');
    ok('{ Statement; Statement; }');
    error('{');
    error('{;');
    error('{ Statement');
    error('{ Statement;');
    error('{ Statement}');
    error('{ Statement; Statement');
    error('{ Statement; Statement;');
    error('{ Statement; Statement }');
  });
});
