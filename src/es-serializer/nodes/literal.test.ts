import { expect, suite, test } from 'vitest';
import { Literal } from '../../es-ast';
import { serialize } from '../serialize';

suite('Literal', () => {
  suite('NullLiteral', () => {
    test('null', () => {
      expect(serialize(Literal(null))).toBe('null');
    });
  });

  suite('BooleanLiteral', () => {
    test('true', () => {
      expect(serialize(Literal(true))).toBe('true');
    });

    test('false', () => {
      expect(serialize(Literal(false))).toBe('false');
    });
  });

  suite('NumericLiteral', () => {
    test('DecimalLiteral', () => {
      expect(serialize(Literal(0.123))).toBe('0.123');
    });

    test('DecimalBigIntegerLiteral', () => {
      expect(serialize(Literal(123n))).toBe('123n');
    });
  });

  suite('StringLiteral', () => {
    suite('" DoubleStringCharacters<opt> "', () => {
      suite('DoubleStringCharacters<opt>', () => {
        test('<empty>', () => {
          expect(serialize(Literal(''))).toBe('""');
        });

        test('SourceCharacter but not one of " or \\ or LineTerminator', () => {
          expect(serialize(Literal('abc'))).toBe('"abc"');
        });

        test('<LS>', () => {
          expect(serialize(Literal('\u2028'))).toBe('"\u2028"');
        });

        test('<PS>', () => {
          expect(serialize(Literal('\u2029'))).toBe('"\u2029"');
        });

        test('\\ EscapeSequence', () => {
          expect(serialize(Literal('a"b'))).toBe('"a\\"b"');
        });
      });
    });
  });

  suite('RegularExpressionLiteral', () => {
    test('/ RegularExpressionBody / RegularExpressionFlags', () => {
      expect(serialize(Literal(/a.*b/gimsuy))).toBe('/a.*b/gimsuy');
    });
  });
});
