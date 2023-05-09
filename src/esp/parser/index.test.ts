import { expect, suite, test } from 'vitest';
import { parser } from '.';
import { cst } from '../cst';
import { token } from '../token';

const createTest = <V extends cst.Node>(
  parse: (data: string, s: number) => V,
) => {
  return (data: string, v: V) => {
    expect(parse(data, 0)).toStrictEqual(v);
  };
};

const is = {
  primaryExpression: createTest(parser.parsePrimaryExpression),
  unaryExpression: createTest(parser.parseUnaryExpression),
  binaryExpression: createTest(parser.parseBinaryExpression),
  consequentExpression: createTest(parser.parseConsequentExpression),
};

suite('parser', () => {
  suite('PrimaryExpression', () => {
    test('Invalid', () => {
      is.primaryExpression('¤', cst.Invalid());
    });

    test('NumberLiteral', () => {
      is.primaryExpression('0', cst.NumberLiteral(0, 1, 0));
      is.primaryExpression('01', cst.NumberLiteral(0, 1, 0));
      is.primaryExpression('120', cst.NumberLiteral(0, 3, 120));
      is.primaryExpression('0.120', cst.NumberLiteral(0, 5, 0.12));
      is.primaryExpression('120.120', cst.NumberLiteral(0, 7, 120.12));
    });

    test('StringLiteral', () => {
      is.primaryExpression("'ab'", cst.StringLiteral(0, 4, 'ab'));
    });

    test('BooleanLiteral', () => {
      is.primaryExpression('true', cst.BooleanLiteral(0, 4, true));
      is.primaryExpression('false', cst.BooleanLiteral(0, 5, false));
    });

    test('Identifier', () => {
      is.primaryExpression('falsey', cst.Identifier(0, 6, 'falsey'));
    });
  });

  test('UnaryExpression', () => {
    is.unaryExpression('¤', cst.Invalid());
    is.unaryExpression('a', cst.Identifier(0, 1, 'a'));
    is.unaryExpression(
      '-a',
      cst.UnaryExpression(
        0,
        2,
        token.UnaryOperator(0, 1, '-'),
        cst.Identifier(1, 2, 'a'),
      ),
    );
  });

  test('BinaryExpression', () => {
    is.binaryExpression('a', cst.Identifier(0, 1, 'a'));
    is.binaryExpression('a+', cst.Invalid(2));
    is.binaryExpression(
      'a+b',
      cst.BinaryExpression(
        0,
        3,
        cst.Identifier(0, 1, 'a'),
        token.BinaryOperator(1, 2, '+'),
        cst.Identifier(2, 3, 'b'),
      ),
    );
  });

  suite('ConsequentExpression', () => {
    test('BinaryExpression', () => {
      is.consequentExpression('a', cst.Identifier(0, 1, 'a'));
      is.consequentExpression(
        'a+b',
        cst.BinaryExpression(
          0,
          3,
          cst.Identifier(0, 1, 'a'),
          token.BinaryOperator(1, 2, '+'),
          cst.Identifier(2, 3, 'b'),
        ),
      );
    });

    test('Invalid', () => {
      is.consequentExpression('return', cst.Invalid());
    });

    test('ReturnExpression', () => {
      is.consequentExpression(
        'return a',
        cst.ReturnExpression(0, 8, cst.Identifier(7, 8, 'a')),
      );
    });

    test('ThrowExpression', () => {
      is.consequentExpression(
        'throw a',
        cst.ThrowExpression(0, 7, cst.Identifier(6, 7, 'a')),
      );
    });
  });
});
