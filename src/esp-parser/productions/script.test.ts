import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseScript } from './script';

const { ok } = createParseAssert(parseScript);

suite('Script', () => {
  test('StatementList<opt>', () => {
    ok('');
    ok(' ');
    ok('a;');
    ok('a;b;');
  });
});
