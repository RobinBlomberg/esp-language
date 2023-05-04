import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseScript } from './script';

const { ok } = createParseAssert(parseScript);

suite('Script', () => {
  test(/* s */ `StatementList?`, () => {
    ok('');
    ok('a;');
    ok('a;b;');
  });
});
