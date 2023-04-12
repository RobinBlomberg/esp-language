import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseIdentifierName } from './identifier-name';

const { ok } = createParseAssert(parseIdentifierName);

suite('IdentifierName', () => {
  test('"IdentifierStart"', () => {
    ok('a');
    ok('IdentifierStart');
    ok('debugger');
  });
});
