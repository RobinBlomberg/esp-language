import { suite, test } from 'vitest';
import { createParseAssert } from '../test-utils';
import { parseSetLiteral } from './set-literal';

const { fail, ok } = createParseAssert(parseSetLiteral);

suite('SetLiteral', () => {
  test('"#{ ValueList }"', () => {
    ok('#{}');
    ok('#{1}');
    ok('#{1, 2}');
    fail('#');
    fail('#{');
    fail('#{,}');
    fail('#{, 1}');
    fail('#{1');
    fail('#{1,');
    fail('#{1,}');
    fail('#{1, 2');
    fail('#{1, 2,}');
    fail('#{1, , 2}');
    fail('#{1 2}');
  });
});
