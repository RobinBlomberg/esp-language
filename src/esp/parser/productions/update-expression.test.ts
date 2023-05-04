import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseUpdateExpression } from './update-expression';

const { error, ok, throws, unused } = createParseAssert(parseUpdateExpression);

suite('UpdateExpression', () => {
  test(/* s */ `NewExpression`, () => {
    unused();
    ok('a');
    ok('a.b');
  });

  test(/* s */ `NewExpression '++'`, () => {
    ok('a++');
    ok('a.b++');
    throws('a()++');
  });

  test(/* s */ `NewExpression '--'`, () => {
    ok('a--');
  });

  test(/* s */ `'++' UnaryExpression`, () => {
    ok('++a');
    ok('++a.b');
    error('++');
    throws('++a()');
  });

  test(/* s */ `'--' UnaryExpression`, () => {
    ok('--a');
    error('--');
  });
});
