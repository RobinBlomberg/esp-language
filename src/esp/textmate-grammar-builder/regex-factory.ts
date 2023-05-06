import {
  any,
  boundary,
  capture,
  concat,
  end,
  group,
  lookahead,
  one,
  or,
  RegExpPattern,
} from '../../utils/regexp';
import * as p from './regexp-patterns';
import { ESPScopeSelector } from './scope-selectors';
import {
  ConstantKeywordNames,
  ControlKeywordNames,
  OperatorNames,
  PunctuationNames,
} from './semantic-names';
import { TextMate } from './textmate';

export const regex = {
  callIdentifier: () =>
    concat(
      p.identifier,
      lookahead(
        one(/\s/).star(),
        group(
          or(
            p.callOpenParen,
            p.functionExpressionOperator,
            p.functionDeclarationOperator,
          ),
        ),
      ),
    ).compile(),
  comment: {
    block: {
      begin: () => one('/*').compile(),
      end: () => one('*/').compile(),
    },
    line: {
      begin: () => one('//').compile(),
      end: () => lookahead(end).compile(),
    },
  },
  constant: () => {
    const nameMatchesMap: { [K in ESPScopeSelector]?: string[] } = {};

    for (const [match, name] of [
      ...Object.entries(ConstantKeywordNames),
      ...Object.entries(ControlKeywordNames),
      ...Object.entries(OperatorNames),
      ...Object.entries(PunctuationNames),
    ]) {
      if (name) {
        (nameMatchesMap[name] ??= []).push(match);
      }
    }

    const alternatives: RegExpPattern[] = [];
    const captures: TextMate.Captures = {};
    let index = 0;

    for (const [name, matches] of Object.entries(nameMatchesMap)) {
      alternatives.push(
        capture(
          or(
            ...matches.map((match) =>
              p.identifier.toRegExp().test(match)
                ? concat(boundary.word, one(match), boundary.word)
                : one(match),
            ),
          ),
        ),
      );

      captures[index + 1] = { name };
      index++;
    }

    const match = or(...alternatives).compile();

    return { match, captures };
  },
  identifier: () => p.identifier.compile(),
  number: () =>
    concat(
      boundary.word,
      group(or(one('0'), concat(one(/[1-9]/), one(/\d/).star()))),
      group(one('.'), one(/\d/).plus()).optional(),
      boundary.word,
    ).compile(),
  stringEscape: () => concat(one('\\'), any).compile(),
};
