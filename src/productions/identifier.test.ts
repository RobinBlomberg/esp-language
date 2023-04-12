import { describe, it, suite } from 'vitest';
import { Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseIdentifier } from './identifier';

const { fail, ok } = createParseAssert(parseIdentifier);

suite('Identifier', () => {
  describe('"IdentifierName IdentifierPart"', () => {
    it('should accept non-reserved words', () => {
      ok(' falsey ', Identifier(1, 7, 'falsey'));
    });

    it('should not accept reserved words', () => {
      fail('false');
    });
  });
});
