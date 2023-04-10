import { describe, it, suite } from 'vitest';
import { Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseIdentifierName } from './identifier-name';

const { ok } = createParseAssert(parseIdentifierName);

suite('IdentifierName', () => {
  describe('IdentifierName IdentifierPart', () => {
    it('should accept non-reserved words', () => {
      ok(' falsey ', Identifier(1, 7, 'falsey'));
    });

    it('should accept reserved words', () => {
      ok('false', Identifier(0, 5, 'false'));
    });
  });
});
