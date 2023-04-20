import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseReturnStatement } from './return-statement';

const { ok } = createParseAssert(parseReturnStatement);

suite('Script', () => {
  test('StatementList<opt>', () => {
    ok('');
    ok('  ');
    ok('Statement;');
    ok('Statement; Statement;');
  });
});
