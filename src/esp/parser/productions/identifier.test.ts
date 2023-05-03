import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseIdentifier } from './identifier';

const { error, ok, unused } = createParseAssert(parseIdentifier);

suite('Identifier', () => {
  test(/* s */ `IdentifierName - ReservedWord`, () => {
    unused();
    ok('elsa');
    error('else');
  });
});
