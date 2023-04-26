import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseIdentifierName } from './identifier-name';

const { ok, unused } = createParseAssert(parseIdentifierName);

suite('IdentifierName', () => {
  test('"IdentifierStart"', () => {
    unused();
    ok('a');
  });

  test('"IdentifierName IdentifierPart"', () => {
    ok('else');
  });
});
