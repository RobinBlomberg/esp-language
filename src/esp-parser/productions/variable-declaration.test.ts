import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseVariableDeclaration } from './variable-declaration';

const { error, ok, unused } = createParseAssert(parseVariableDeclaration);

suite('VariableDeclaration', () => {
  test(/* s */ `LetOrConst Identifier '=' Expression ';'`, () => {
    unused();
    ok('let a=b;');
    ok('const a=b;');
    error('let');
    error('let a');
    error('let a=');
    error('let a=b');
    error('let continue=b');
  });
});
