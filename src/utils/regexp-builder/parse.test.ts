import { expect, it, suite } from 'vitest';
import { parse } from './parse';
import {
  Alternation,
  Any,
  Character,
  CharacterClass,
  Concatenation,
  End,
  Group,
  Quantifier,
  Range,
  Start,
} from './patterns';

suite('regexp-builder#parse', () => {
  it('should work without helpers', () => {
    expect(
      RegExp(
        parse(
          Concatenation([
            Start(),
            Alternation([
              Character('0'),
              Concatenation([
                CharacterClass(false, [Range('1', '9')]),
                Quantifier(
                  CharacterClass(false, [Range('0', '9')]),
                  0,
                  Infinity,
                  false,
                ),
              ]),
            ]),
            End(),
          ]),
        ),
      ),
    ).toStrictEqual(/^0|[1-9][0-9]*$/);

    expect(
      RegExp(
        parse(
          Concatenation([
            Start(),
            Quantifier(Character(' '), 4, 4, false),
            Character('a'),
            Character('t'),
            Character(' '),
            Quantifier(
              Group(false, [
                Quantifier(
                  Group(false, [
                    Quantifier(
                      CharacterClass(true, [Character(' ')]),
                      1,
                      Infinity,
                      false,
                    ),
                    Character(' '),
                    Character('('),
                    Quantifier(
                      CharacterClass(true, [Character(' ')]),
                      1,
                      Infinity,
                      false,
                    ),
                    Character(' '),
                    Character('a'),
                    Character('t'),
                    Character(' '),
                  ]),
                  0,
                  1,
                  false,
                ),
                Group(true, [
                  Quantifier(
                    CharacterClass(true, [Character(' ')]),
                    1,
                    Infinity,
                    false,
                  ),
                ]),
                Character(' '),
                Quantifier(Character('('), 0, 1, false),
              ]),
              0,
              1,
              false,
            ),
            Group(true, [Quantifier(Any(), 1, Infinity, true)]),
            Character(':'),
            Group(true, [
              Quantifier(
                CharacterClass(false, [Range('0', '9')]),
                1,
                Infinity,
                false,
              ),
            ]),
            Character(':'),
            Group(true, [
              Quantifier(
                CharacterClass(false, [Range('0', '9')]),
                1,
                Infinity,
                false,
              ),
            ]),
          ]),
        ),
      ),
    ).toStrictEqual(
      /^ {4}at (?:(?:[^ ]+ \([^ ]+ at )?([^ ]+) \(?)?(.+?):([0-9]+):([0-9]+)/,
    );
  });

  it('should work with helpers', () => {
    expect(
      Concatenation([
        Start(),
        Alternation([
          Character('0'),
          Concatenation([
            CharacterClass(false, [Range('1', '9')]),
            CharacterClass(false, [Range('0', '9')]).zeroOrMore(),
          ]),
        ]),
        End(),
      ]).regex(),
    ).toStrictEqual(/^0|[1-9][0-9]*$/);

    expect(
      Concatenation([
        Start(),
        Character(' ').repeat(4),
        Character('a'),
        Character('t'),
        Character(' '),
        Group(false, [
          Group(false, [
            CharacterClass(true, [Character(' ')]).oneOrMore(),
            Character(' '),
            Character('('),
            CharacterClass(true, [Character(' ')]).oneOrMore(),
            Character(' '),
            Character('a'),
            Character('t'),
            Character(' '),
          ]).optional(),
          Group(true, [CharacterClass(true, [Character(' ')]).oneOrMore()]),
          Character(' '),
          Character('(').optional(),
        ]).optional(),
        Group(true, [Any().oneOrMore().lazy()]),
        Character(':'),
        Group(true, [CharacterClass(false, [Range('0', '9')]).oneOrMore()]),
        Character(':'),
        Group(true, [CharacterClass(false, [Range('0', '9')]).oneOrMore()]),
      ]).regex(),
    ).toStrictEqual(
      /^ {4}at (?:(?:[^ ]+ \([^ ]+ at )?([^ ]+) \(?)?(.+?):([0-9]+):([0-9]+)/,
    );
  });
});
