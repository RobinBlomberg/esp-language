import { expect, test } from 'vitest';
import { createRegExp } from './create-regexp';
import { boundary, capture, concat, one, or } from './factories';
import { testRegExp } from './test-regexp';

test('testRegExp', () => {
  const sign = capture(one(/[-+]/)).name('sign');

  const integer = capture(
    or(one('0'), concat(one(/[1-9]/), one(/\d/).star())),
  ).name('integer');

  const fractional = capture(one('.'), one(/\d/).plus()).name('fractional');

  const number = createRegExp([
    sign.optional(),
    boundary.word,
    integer,
    boundary.word,
    fractional.optional(),
  ]);

  expect(testRegExp('-123', number)).toBe(true);
  expect(testRegExp('-0123', number)).toBe(false);
  expect(testRegExp('value: 0.5', number, 7)).toBe(true);
  expect(testRegExp('value: 0.5', number, 6)).toBe(true);
});
