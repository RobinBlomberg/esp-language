import { test } from 'vitest';
import { Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseIdentifierName } from './identifier-name';

const { ok } = createParseAssert(parseIdentifierName);

test('IdentifierName', () => {
  ok(' falsey ', Identifier(1, 7, 'falsey'));
  ok('false', Identifier(0, 5, 'false'));
});
