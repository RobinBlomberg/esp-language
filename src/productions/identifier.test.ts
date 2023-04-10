import { test } from 'vitest';
import { Identifier } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseIdentifier } from './identifier';

const { fail, ok } = createParseAssert(parseIdentifier);

test('Identifier', () => {
  ok(' falsey ', Identifier(1, 7, 'falsey'));
  fail('false');
});
