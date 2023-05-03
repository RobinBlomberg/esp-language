import { expect, suite, test } from 'vitest';
import {
  BreakStatement,
  CallExpression,
  ExpressionStatement,
  Identifier,
  Literal,
  SwitchCase,
} from '../../ast';
import { serialize } from '../serialize';

suite('SwitchCase', () => {
  suite('CaseClause[Yield, Await, Return] :', () => {
    test(
      'case Expression[+In, ?Yield, ?Await] : ' +
        'StatementList[?Yield, ?Await, ?Return]<opt>',
      () => {
        expect(serialize(SwitchCase(Identifier('a'), []))).toBe('case a:');
        expect(
          serialize(
            SwitchCase(Identifier('a'), [
              ExpressionStatement(CallExpression(Identifier('b'), [], false)),
              BreakStatement(null),
            ]),
          ),
        ).toBe('case a:b();break;');
        expect(serialize(SwitchCase(Literal(0), []))).toBe('case 0:');
      },
    );
  });

  suite('DefaultClause[Yield, Await, Return] :', () => {
    test('default : StatementList[?Yield, ?Await, ?Return]<opt>', () => {
      expect(serialize(SwitchCase(null, []))).toBe('default:');
    });
  });
});
