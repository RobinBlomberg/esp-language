import { expect, test } from 'vitest';
import { createRegExp } from './create-regexp';
import { boundary, capture, concat, one, or } from './factories';
import { matchRegExp } from './match-regexp';

test('matchRegExp', () => {
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

  expect(matchRegExp('-123', number)).toStrictEqual({
    match: '-123',
    index: 0,
    indices: [0, 4],
    captures: ['-', '123', undefined],
    captureIndices: [[0, 1], [1, 4], undefined],
    groups: { sign: '-', integer: '123', fractional: undefined },
    groupIndices: { sign: [0, 1], integer: [1, 4], fractional: undefined },
  });

  expect(matchRegExp('value: 0.5', number, 7)).toStrictEqual({
    match: '0.5',
    index: 7,
    indices: [7, 10],
    captures: [undefined, '0', '.5'],
    captureIndices: [undefined, [7, 8], [8, 10]],
    groups: { sign: undefined, integer: '0', fractional: '.5' },
    groupIndices: { sign: undefined, integer: [7, 8], fractional: [8, 10] },
  });
});
