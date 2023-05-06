import { expect, suite, test } from 'vitest';
import { createRegExp, createRegExp as r } from './create-regexp';
import { _ } from './factory';
import { RegExpPattern } from './patterns/pattern';

const expectIt = (
  regex: RegExp | RegExpPattern | RegExpPattern[],
  flags?: string,
) => {
  return expect(createRegExp(regex, flags));
};

suite('createRegExp', () => {
  suite('Character', () => {
    suite('string', () => {
      test('single character', () => {
        expectIt(_('a')).toStrictEqual(/a/);
        expectIt(_('.')).toStrictEqual(/\./);
        expectIt([_('a'), _('b')]).toStrictEqual(/ab/);
      });

      test('multiple characters', () => {
        expectIt(_('ab')).toStrictEqual(/ab/);
      });
    });

    suite('RegExp', () => {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
      test('single character', () => {
        expectIt(_(/[xyz]/)).toStrictEqual(/[xyz]/);
        expectIt(_(/[^xyz]/)).toStrictEqual(/[^xyz]/);
        expectIt(_(/./)).toStrictEqual(/./);
        expectIt(_(/\d/)).toStrictEqual(/\d/);
        expectIt(_(/\D/)).toStrictEqual(/\D/);
        expectIt(_(/\w/)).toStrictEqual(/\w/);
        expectIt(_(/\W/)).toStrictEqual(/\W/);
        expectIt(_(/\s/)).toStrictEqual(/\s/);
        expectIt(_(/\S/)).toStrictEqual(/\S/);
        expectIt(_(/\t/)).toStrictEqual(/\t/);
        expectIt(_(/\r/)).toStrictEqual(/\r/);
        expectIt(_(/\n/)).toStrictEqual(/\n/);
        expectIt(_(/\v/)).toStrictEqual(/\v/);
        expectIt(_(/\f/)).toStrictEqual(/\f/);
        expectIt(_(/[\b]/)).toStrictEqual(/[\b]/);
        expectIt(_(/\0/)).toStrictEqual(/\0/);
        expectIt(_(/\cX/)).toStrictEqual(/\cX/);
        expectIt(_(/\xA0/)).toStrictEqual(/\xA0/);
        expectIt(_(/\u89ab/)).toStrictEqual(/\u89ab/);
        expectIt(_(/\u{89ab}/)).toStrictEqual(/\u{89ab}/);
        expectIt(_(/\p{Emoji_Presentation}/)).toStrictEqual(
          /\p{Emoji_Presentation}/,
        );
      });

      test('multiple characters', () => {
        expectIt(_(/ab/)).toStrictEqual(/ab/);
        expectIt(_(/[a-zA-Z$_][a-zA-Z0-9$_]/)).toStrictEqual(
          /[a-zA-Z$_][a-zA-Z0-9$_]/,
        );
        expect(() => r(_(/.*/))).toThrow();
        expect(() => r(_(/ab+/))).toThrow();
      });
    });
  });

  test('NonCapturingGroup', () => {
    expectIt(_.group(_('a'), _('b'))).toStrictEqual(/(?:ab)/);
  });

  suite('CapturingGroup', () => {
    test('non-named', () => {
      expectIt(_.capture(_('a'), _('b'))).toStrictEqual(/(ab)/);
    });

    test('named', () => {
      expectIt(_.capture(_('a'), _('b')).name('word')).toStrictEqual(
        /(?<word>ab)/,
      );
    });
  });

  suite('Alternation', () => {
    test('character', () => {
      expectIt(_.or(_('a'), _('b'))).toStrictEqual(/a|b/);
    });

    test('group', () => {
      expectIt(_.or(_.group(_('a'), _('b')), _('c'))).toStrictEqual(/(?:ab)|c/);
    });
  });

  suite('Quantifier', () => {
    test('greedy mode', () => {
      expectIt(_('a').repeat(0, 1)).toStrictEqual(/a?/);
      expectIt(_('a').repeat(0, Infinity)).toStrictEqual(/a*/);
      expectIt(_('a').repeat(1)).toStrictEqual(/a/);
      expectIt(_('a').repeat(1, Infinity)).toStrictEqual(/a+/);
      expectIt(_('a').repeat(2)).toStrictEqual(/a{2}/);
      expectIt(_('a').repeat(2, 3)).toStrictEqual(/a{2,3}/);
      expectIt(_('a').repeat(2, Infinity)).toStrictEqual(/a{2,}/);
    });

    test('lazy mode', () => {
      expectIt(_('a').repeat(0, 1).lazy()).toStrictEqual(/a??/);
      expectIt(_('a').repeat(0, Infinity).lazy()).toStrictEqual(/a*?/);
      expectIt(_('a').repeat(1).lazy()).toStrictEqual(/a?/);
      expectIt(_('a').repeat(1, Infinity).lazy()).toStrictEqual(/a+?/);
      expectIt(_('a').repeat(2).lazy()).toStrictEqual(/a{2}?/);
      expectIt(_('a').repeat(2, 3).lazy()).toStrictEqual(/a{2,3}?/);
      expectIt(_('a').repeat(2, Infinity).lazy()).toStrictEqual(/a{2,}?/);
    });

    test('quantifier symbols', () => {
      expectIt(_('a').optional()).toStrictEqual(/a?/);
      expectIt(_('a').star()).toStrictEqual(/a*/);
      expectIt(_('a').plus()).toStrictEqual(/a+/);
    });

    test('quantified group', () => {
      expectIt(_.group(_('a'), _('b')).optional()).toStrictEqual(/(?:ab)?/);
    });

    test('quantified character class', () => {
      expectIt(_(/[a-zA-Z$_]/).star()).toStrictEqual(/[a-zA-Z$_]*/);
    });
  });

  test('Concatenation', () => {
    expectIt(_.concat(_('a'), _('b'))).toStrictEqual(/ab/);
    expectIt(_.or(_('0'), _.concat(_(/[1-9]/), _(/\d/).star()))).toStrictEqual(
      /0|[1-9]\d*/,
    );
  });

  test('BoundaryAssertion', () => {
    expectIt(_.end).toStrictEqual(/$/);
    expectIt(_.start).toStrictEqual(/^/);
    expectIt(_.boundary.nonword).toStrictEqual(/\B/);
    expectIt(_.boundary.word).toStrictEqual(/\b/);
  });

  test('LookaroundAssertion', () => {
    expectIt(_.lookahead(_('a'), _('b'))).toStrictEqual(/(?=ab)/);
    expectIt(_.lookbehind(_('a'), _('b'))).toStrictEqual(/(?<=ab)/);
    expectIt(_.lookahead.not(_('a'), _('b'))).toStrictEqual(/(?!ab)/);
    expectIt(_.lookbehind.not(_('a'), _('b'))).toStrictEqual(/(?<!ab)/);
  });

  suite('Backreference', () => {
    test('non-named', () => {
      expectIt([_.capture(_('a')), _.ref(1)]).toStrictEqual(/(a)\1/);
    });

    test('named', () => {
      expectIt([
        _.capture(_('a')).name('letter'),
        _.ref('letter'),
      ]).toStrictEqual(/(?<letter>a)\k<letter>/);
    });
  });
});
