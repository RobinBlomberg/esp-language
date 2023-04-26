import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseSetLiteral } from './set-literal';

const { error, ok, unused } = createParseAssert(parseSetLiteral);

suite('SetLiteral', () => {
  test('"#{ ValueList }"', () => {
    unused();
    ok('#{}');
    ok('#{1}');
    ok('#{1, 2}');
    error('#');
    error('#{');
    error('#{,}');
    error('#{, 1}');
    error('#{1');
    error('#{1,');
    error('#{1,}');
    error('#{1, 2');
    error('#{1, 2,}');
    error('#{1, , 2}');
    error('#{1 2}');
  });
});
