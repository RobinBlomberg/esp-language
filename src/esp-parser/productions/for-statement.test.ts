import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseForStatement } from './for-statement';

const { error, ok, unused } = createParseAssert(parseForStatement);

suite('ForStatement', () => {
  test(
    /* s */ `'for' '(' VariableDeclaration? ';' Expression? ';' Expression? ')' ` +
      /* s */ `Statement`,
    () => {
      unused();
      ok('for(;;){};');
      ok('for(let a=b;c;d)e;');
      error('for');
      error('for(;;;)e;');
      error('for(;;);');
      error('for(;)e;');
      error('for(;c;d;)e;');
      error('for(');
      error('for()e;');
      error('for(let a');
      error('for(let a=');
      error('for(let a=b c;d)e;');
      error('for(let a=b;');
      error('for(let a=b;c d)e;');
      error('for(let a=b;c;');
      error('for(let a=b;c;d;)e;');
      error('for(let a=b;c;d;)e;');
      error('for(let a=b;c;d');
      error('for(let a=b;c;d)');
      error('for(let a=b;c;d)e');
      error('for(let a=b;c');
      error('for(let a=b');
      error('for(let;c;d)e;');
      error('for(let');
    },
  );

  test(/* s */ `'for' '(' VariableDeclaration 'of' Expression ')' Statement`, () => {
    ok('for(let a of b){};');
    error('for(let a=b of');
  });
});
