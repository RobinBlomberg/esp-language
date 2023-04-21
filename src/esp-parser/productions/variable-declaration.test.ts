import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseVariableDeclaration } from './variable-declaration';

const { fail, ok } = createParseAssert(parseVariableDeclaration);

suite('VariableDeclaration', () => {
  test('"let Identifier = Expression ;"', () => {
    ok('let Identifier = Expression;');
    fail('let');
    fail('let Identifier');
    fail('let Identifier =');
    fail('let Identifier = Expression');
    fail('let continue = Expression');
  });
});
