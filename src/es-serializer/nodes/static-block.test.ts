import { expect, suite, test } from 'vitest';
import { ExpressionStatement, Identifier, StaticBlock } from '../../es-ast';
import { serialize } from '../serialize';

suite('StaticBlock', () => {
  test('static { ClassStaticBlockBody }', () => {
    expect(serialize(StaticBlock([]))).toBe('static{}');
    expect(serialize(StaticBlock([ExpressionStatement(Identifier('a'))]))).toBe(
      'static{a;}',
    );
    expect(
      serialize(
        StaticBlock([
          ExpressionStatement(Identifier('a')),
          ExpressionStatement(Identifier('b')),
        ]),
      ),
    ).toBe('static{a;b;}');
  });
});
