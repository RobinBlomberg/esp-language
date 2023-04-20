import { expect, suite, test } from 'vitest';
import { BlockStatement, FunctionExpression, Identifier } from '../../estree';
import { serialize } from '../write';

suite('FunctionExpression', () => {
  suite('FunctionExpression', () => {
    test(
      'function BindingIdentifier[~Yield, ~Await]<opt> ( FormalParameters[~Yield, ~Await] ) { ' +
        'FunctionBody[~Yield, ~Await] }',
      () => {
        expect(
          serialize(
            FunctionExpression(null, [], BlockStatement([]), false, false),
          ),
        ).toBe('function(){}');
        expect(
          serialize(
            FunctionExpression(
              Identifier('a'),
              [Identifier('b'), Identifier('c')],
              BlockStatement([]),
              false,
              false,
            ),
          ),
        ).toBe('function a(b,c){}');
      },
    );
  });

  suite('AsyncFunctionExpression', () => {
    test(
      'async [no LineTerminator here] function BindingIdentifier[~Yield, +Await]<opt> ( ' +
        'FormalParameters[~Yield, +Await] ) { AsyncFunctionBody }',
      () => {
        expect(
          serialize(
            FunctionExpression(null, [], BlockStatement([]), false, true),
          ),
        ).toBe('async function(){}');
        expect(
          serialize(
            FunctionExpression(
              Identifier('a'),
              [Identifier('b'), Identifier('c')],
              BlockStatement([]),
              false,
              true,
            ),
          ),
        ).toBe('async function a(b,c){}');
      },
    );
  });

  suite('GeneratorExpression', () => {
    test(
      'function * BindingIdentifier[+Yield, ~Await]<opt> ( FormalParameters[+Yield, ~Await] ) { ' +
        'GeneratorBody }',
      () => {
        expect(
          serialize(
            FunctionExpression(null, [], BlockStatement([]), true, false),
          ),
        ).toBe('function*(){}');
        expect(
          serialize(
            FunctionExpression(
              Identifier('a'),
              [Identifier('b'), Identifier('c')],
              BlockStatement([]),
              true,
              false,
            ),
          ),
        ).toBe('function*a(b,c){}');
      },
    );
  });
  suite('AsyncGeneratorExpression', () => {
    test(
      'async [no LineTerminator here] function * BindingIdentifier[+Yield, +Await]<opt> ( ' +
        'FormalParameters[+Yield, +Await] ) { AsyncGeneratorBody }',
      () => {
        expect(
          serialize(
            FunctionExpression(null, [], BlockStatement([]), true, true),
          ),
        ).toBe('async function*(){}');
        expect(
          serialize(
            FunctionExpression(
              Identifier('a'),
              [Identifier('b'), Identifier('c')],
              BlockStatement([]),
              true,
              true,
            ),
          ),
        ).toBe('async function*a(b,c){}');
      },
    );
  });
});
