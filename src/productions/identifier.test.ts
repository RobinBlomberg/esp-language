import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseIdentifier } from './identifier';

const { fail, ok } = createParseAssert(parseIdentifier);

suite('Identifier', () => {
  test('"IdentifierName but not ReservedWord"', () => {
    ok('elsa');
    fail('else');
  });
});
