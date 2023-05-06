import { ESPPatternName, pattern } from './pattern-factory';
import { regex } from './regex-factory';
import { scope } from './scope-selector-factory';
import { TextMate } from './textmate';

export type Repository = {
  [K in ESPPatternName]: TextMate.Pattern;
};

export const patterns = [
  pattern.comment(),
  pattern.constant(),
  pattern.callIdentifier(),
  pattern.identifier(),
  pattern.literal(),
];

export const repository: Repository = {
  callIdentifier: {
    name: scope.entity.name.function(),
    match: regex.callIdentifier(),
  },
  comment: {
    patterns: [
      {
        name: scope.comment.block(),
        begin: regex.comment.block.begin(),
        beginCaptures: { 0: { name: scope.punctuation.definition.comment() } },
        end: regex.comment.block.end(),
        endCaptures: { 0: { name: scope.punctuation.definition.comment() } },
      },
      {
        begin: regex.comment.line.begin(),
        beginCaptures: { 0: { name: scope.comment.line.doubleSlash() } },
        end: regex.comment.line.end(),
        contentName: scope.comment.line.doubleSlash(),
      },
    ],
  },
  constant: regex.constant(),
  identifier: {
    name: scope.variable.other.readwrite(),
    match: regex.identifier(),
  },
  literal: {
    patterns: [pattern.numericLiteral(), pattern.stringLiteral()],
  },
  numericLiteral: {
    name: scope.constant.numeric.decimal(),
    match: regex.number(),
  },
  stringEscape: {
    name: scope.constant.character.escape(),
    match: regex.stringEscape(),
  },
  stringLiteral: {
    patterns: [
      { type: 'single' as const, quote: "'" },
      { type: 'double' as const, quote: '"' },
    ].map(({ type, quote }) => ({
      name: scope.string.quoted[type](),
      begin: quote,
      beginCaptures: {
        0: { name: scope.punctuation.definition.string.begin() },
      },
      end: quote,
      endCaptures: { 0: { name: scope.punctuation.definition.string.end() } },
      patterns: [pattern.stringEscape()],
    })),
  },
};
