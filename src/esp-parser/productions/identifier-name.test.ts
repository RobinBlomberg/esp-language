import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseIdentifierName } from './identifier-name';

const { ok, unused } = createParseAssert(parseIdentifierName);

suite('IdentifierName', () => {
  test(/* s */ `IdentifierStart`, () => {
    unused();
    ok('a');
  });

  test(/* s */ `IdentifierName IdentifierPart`, () => {
    ok('else');
  });
});
