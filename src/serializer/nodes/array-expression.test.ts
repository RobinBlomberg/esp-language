import { expect, test } from 'vitest';
import { ArrayExpression, Identifier } from '../../estree';
import { serialize } from '../write';

test('ArrayExpression', () => {
  expect(serialize(ArrayExpression([]))).toBe('[]');
  expect(serialize(ArrayExpression([Identifier('a')]))).toBe('[a]');
  expect(serialize(ArrayExpression([Identifier('a'), Identifier('b')]))).toBe(
    '[a,b]',
  );
  expect(serialize(ArrayExpression([null]))).toBe('[,]');
  expect(serialize(ArrayExpression([null, null]))).toBe('[,,]');
});
