import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseVariableDeclaration } from './variable-declaration';

const { error, ok, unused } = createParseAssert(parseVariableDeclaration);

suite('VariableDeclaration', () => {
  test(/* s */ `LetOrConst Identifier '=' Expression ';'`, () => {
    unused();
    ok('const a=b;');
    ok('let i=0;');
    error('let');
    error('let i');
    error('let i=');
    error('let i=0');
    error('let continue=0');
  });
});
