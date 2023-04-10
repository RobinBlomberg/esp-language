import { test } from 'vitest';
import { identifier } from '../node-factory';
import { createParseAssert } from '../test-utils';
import { parseIdentifierName } from './identifier-name';

const { ok } = createParseAssert(parseIdentifierName);

test('IdentifierName', () => {
  ok(' falsey ', identifier(1, 7, 'falsey'));
  ok('false', identifier(0, 5, 'false'));
});
