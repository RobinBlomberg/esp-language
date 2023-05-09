import { expect, suite, test } from 'vitest';
import { parser } from '.';
import { cst } from '../cst';
import { mock } from './mock';

const createAsserter = <V extends cst.Node>(
  parse: (data: string, s: number) => V,
) => {
  return (data: string, v: V) => {
    expect(parse(data, 0)).toStrictEqual(v);
  };
};

const is = {
  primex: createAsserter(parser.parsePrimaryExpression),
  unex: createAsserter(parser.parseUnaryExpression),
  binex: createAsserter(parser.parseBinaryExpression),
  conex: createAsserter(parser.parseConsequentExpression),
};

suite('parser', () => {
  suite('PrimaryExpression', () => {
    test('Invalid', () => {
      is.primex(mock.invalid.data, mock.invalid.node());
    });

    test('NumberLiteral', () => {
      is.primex(mock.number.data, mock.number.node());
      is.primex('01', cst.NumberLiteral(0, 1, 0));
      is.primex('120', cst.NumberLiteral(0, 3, 120));
      is.primex('0.120', cst.NumberLiteral(0, 5, 0.12));
      is.primex('120.120', cst.NumberLiteral(0, 7, 120.12));
    });

    test('StringLiteral', () => {
      is.primex(mock.string.data, mock.string.node());
      is.primex("'ab'", cst.StringLiteral(0, 4, 'ab'));
      is.primex("'a\\'b'", cst.StringLiteral(0, 6, "a'b"));
    });

    test('BooleanLiteral', () => {
      is.primex(mock.bool.data, mock.bool.node());
      is.primex('false', cst.BooleanLiteral(0, 5, false));
    });

    test('Identifier', () => {
      is.primex(mock.id.data, mock.id.node());
      is.primex('falsey', cst.Identifier(0, 6, 'falsey'));
    });
  });

  suite('UnaryExpression', () => {
    test('Invalid', () => {
      is.unex(mock.invalid.data, mock.invalid.node());
    });

    test('PrimaryExpression', () => {
      is.unex(mock.primary.data, mock.primary.node());
    });

    test('UnaryExpression', () => {
      is.unex(mock.unary.data, mock.unary.node());
    });
  });

  suite('BinaryExpression', () => {
    test('Invalid', () => {
      is.binex(mock.invalid.data, mock.invalid.node());
      is.binex('a+', mock.invalid.node(2));
    });

    test('UnaryExpression', () => {
      is.binex(mock.unary.data, mock.unary.node());
    });

    test('BinaryExpression', () => {
      is.binex(mock.binary.data, mock.binary.node());
    });
  });

  suite('ConsequentExpression', () => {
    test('Invalid', () => {
      is.conex(mock.invalid.data, mock.invalid.node());
      is.conex('return', mock.invalid.node());
    });

    test('BinaryExpression', () => {
      is.conex(mock.id.data, mock.id.node());
      is.conex(mock.binary.data, mock.binary.node());
    });

    test('ReturnExpression', () => {
      is.conex(mock.returning.data, mock.returning.node());
    });

    test('ThrowExpression', () => {
      is.conex(mock.throwing.data, mock.throwing.node());
    });
  });
});
