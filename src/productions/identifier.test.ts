import { test } from 'vitest';
import { identifier } from '../node-factory';
import { createParseAssert } from '../test-utils';
import { parseIdentifier } from './identifier';

const { fail, ok } = createParseAssert(parseIdentifier);

test('Identifier', () => {
  ok(' falsey ', identifier(1, 7, 'falsey'));
  fail('false');
});
