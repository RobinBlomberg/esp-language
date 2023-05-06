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
} from '../../utils/regexp';
import { RegExpPattern } from '../../utils/regexp/patterns/pattern';
import { Name } from './names';
import * as p from './regexp-patterns';
import {
  ConstantKeywordNames,
  ControlKeywordNames,
  OperatorNames,
  PunctuationNames,
} from './semantic-names';
import { Captures } from './types';

export const callIdentifier = concat(
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
).compile();

export const commentBlockEnd = one('*/').compile();

export const commentBlockStart = one('/*').compile();

export const commentLineEnd = lookahead(end).compile();

export const commentLineStart = one('//').compile();

export const constant = (() => {
  const nameMatchesMap: { [K in Name]?: string[] } = {};

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
  const captures: Captures = {};
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
})();

export const identifier = p.identifier.compile();

export const number = concat(
  boundary.word,
  group(or(one('0'), concat(one(/[1-9]/), one(/\d/).star()))),
  group(one('.'), one(/\d/).plus()).optional(),
  boundary.word,
).compile();

export const stringEscape = concat(one('\\'), any).compile();
