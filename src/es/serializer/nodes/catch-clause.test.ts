import { expect, suite, test } from 'vitest';
import { BlockStatement, CatchClause, Identifier } from '../../ast';
import { serialize } from '../serialize';

suite('CatchClause', () => {
  test('catch ( CatchParameter[?Yield, ?Await] ) Block[?Yield, ?Await, ?Return]', () => {
    expect(serialize(CatchClause(Identifier('e'), BlockStatement([])))).toBe(
      'catch(e){}',
    );
  });

  test('catch Block[?Yield, ?Await, ?Return]', () => {
    expect(serialize(CatchClause(null, BlockStatement([])))).toBe('catch{}');
  });
});
