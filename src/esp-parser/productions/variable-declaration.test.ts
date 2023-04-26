import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseVariableDeclaration } from './variable-declaration';

const { error, ok, unused } = createParseAssert(parseVariableDeclaration);

suite('VariableDeclaration', () => {
  test('"let Identifier = Expression ;"', () => {
    unused();
    ok('let Identifier = Expression;');
    error('let');
    error('let Identifier');
    error('let Identifier =');
    error('let Identifier = Expression');
    error('let continue = Expression');
  });
});
