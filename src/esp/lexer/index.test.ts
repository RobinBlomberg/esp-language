import { expect, suite, test } from 'vitest';
import { lexer } from '.';
import { syntax } from '../syntax';
import { token } from '../token';

const createTest = <V extends token.Token>(
  parse: (data: string, s: number) => V,
) => {
  return (data: string, v: V) => {
    expect(parse(data, 0)).toStrictEqual(v);
  };
};

const is = {
  identifier: createTest(lexer.lexIdentifier),
  number: createTest(lexer.lexNumber),
  punctuator: createTest(lexer.lexPunctuator),
  string: createTest(lexer.lexString),
};

suite('parser', () => {
  test('Identifier', () => {
    is.identifier('¤', token.Invalid());
    is.identifier('a', token.Identifier(0, 1, 'a'));
    is.identifier('ab', token.Identifier(0, 2, 'ab'));
  });

  test('Number', () => {
    is.number('¤', token.Invalid());
    is.number('0', token.Number(0, 1, '0'));
    is.number('01', token.Number(0, 1, '0'));
    is.number('1', token.Number(0, 1, '1'));
    is.number('987', token.Number(0, 3, '987'));
    is.number('0.12', token.Number(0, 4, '0.12'));
  });

  test('Punctuator', () => {
    is.punctuator('¤', token.Invalid());

    for (const punctuator of syntax.punctuatorList) {
      is.punctuator(
        punctuator,
        token.Punctuator(0, punctuator.length, punctuator),
      );
    }
  });

  test('String', () => {
    is.string('¤', token.Invalid());
    is.string("'\\", token.Invalid());
    is.string("'", token.Invalid());
    is.string("''", token.String(0, 2, "''"));
    is.string("'ab'", token.String(0, 4, "'ab'"));
    is.string("'a\\'b'", token.String(0, 6, "'a\\'b'"));
  });
});
