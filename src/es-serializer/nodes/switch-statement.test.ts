import { expect, suite, test } from 'vitest';
import { Identifier, SwitchCase, SwitchStatement } from '../../es-ast';
import { serialize } from '../serialize';

suite('SwitchStatement', () => {
  suite(
    'switch ( Expression[+In, ?Yield, ?Await] ) CaseBlock[?Yield, ?Await, ?Return]',
    () => {
      suite('CaseBlock[Yield, Await, Return] :', () => {
        test('{ CaseClauses[?Yield, ?Await, ?Return]<opt> }', () => {
          expect(serialize(SwitchStatement(Identifier('a'), []))).toBe(
            'switch(a){}',
          );
          expect(
            serialize(
              SwitchStatement(Identifier('a'), [
                SwitchCase(Identifier('b'), []),
              ]),
            ),
          ).toBe('switch(a){case b:}');
          expect(
            serialize(
              SwitchStatement(Identifier('a'), [
                SwitchCase(Identifier('b'), []),
                SwitchCase(Identifier('c'), []),
              ]),
            ),
          ).toBe('switch(a){case b:case c:}');
          expect(
            serialize(
              SwitchStatement(Identifier('a'), [
                SwitchCase(Identifier('b'), []),
                SwitchCase(null, []),
              ]),
            ),
          ).toBe('switch(a){case b:default:}');
        });
      });
    },
  );
});
