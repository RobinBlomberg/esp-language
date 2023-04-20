import { expect, suite, test } from 'vitest';
import { BlockStatement, CatchClause, Identifier } from '../../estree';
import { serialize } from '../write';

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
