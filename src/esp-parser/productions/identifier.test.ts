import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseIdentifier } from './identifier';

const { error, ok, unused } = createParseAssert(parseIdentifier);

suite('Identifier', () => {
  test('"IdentifierName but not ReservedWord"', () => {
    unused();
    ok('elsa');
    error('else');
  });
});
