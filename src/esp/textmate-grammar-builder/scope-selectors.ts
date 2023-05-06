import {
  ConstantKeyword,
  ControlKeyword,
  Operator,
  Punctuation,
} from '../grammar';
import { ESPScopeSelector } from './scope-selector-factory';

export const ConstantKeywordScopeSelectors: Record<
  ConstantKeyword,
  ESPScopeSelector
> = {
  [ConstantKeyword.False]: 'constant.language.boolean.false.esp',
  [ConstantKeyword.Infinity]: 'constant.language.infinity.esp',
  [ConstantKeyword.NaN]: 'constant.language.nan.esp',
  [ConstantKeyword.Null]: 'constant.language.null.esp',
  [ConstantKeyword.True]: 'constant.language.boolean.true.esp',
  [ConstantKeyword.Undefined]: 'constant.language.undefined.esp',
};

export const ControlKeywordScopeSelectors: Record<
  ControlKeyword,
  ESPScopeSelector
> = {
  [ControlKeyword.Break]: 'keyword.control.loop.esp',
  [ControlKeyword.Const]: 'storage.type.esp',
  [ControlKeyword.Continue]: 'keyword.control.loop.esp',
  [ControlKeyword.Do]: 'keyword.control.loop.esp',
  [ControlKeyword.Else]: 'keyword.control.conditional.esp',
  [ControlKeyword.For]: 'keyword.control.loop.esp',
  [ControlKeyword.If]: 'keyword.control.conditional.esp',
  [ControlKeyword.Let]: 'storage.type.esp',
  [ControlKeyword.Match]: 'keyword.control.switch.esp',
  [ControlKeyword.New]: 'keyword.operator.new.esp',
  [ControlKeyword.Of]: 'keyword.operator.expression.of.esp',
  [ControlKeyword.Return]: 'keyword.control.flow.esp',
  [ControlKeyword.Throw]: 'keyword.control.trycatch.esp',
  [ControlKeyword.While]: 'keyword.control.loop.esp',
};

export const OperatorScopeSelectors: Record<Operator, ESPScopeSelector> = {
  '--': 'keyword.operator.decrement.esp',
  '-': 'keyword.operator.assignment.compound.esp',
  '-=': 'keyword.operator.arithmetic.esp',
  '!': 'keyword.operator.logical.esp',
  '!=': 'keyword.operator.comparison.esp',
  '??': 'keyword.operator.logical.esp',
  '??=': 'keyword.operator.logical.esp',
  '?': 'keyword.operator.ternary.esp',
  '*': 'keyword.operator.arithmetic.esp',
  '**': 'keyword.operator.arithmetic.esp',
  '**=': 'keyword.operator.assignment.compound.esp',
  '*=': 'keyword.operator.assignment.compound.esp',
  '/': 'keyword.operator.arithmetic.esp',
  '/=': 'keyword.operator.assignment.compound.esp',
  '&': 'keyword.operator.bitwise.esp',
  '&&': 'keyword.operator.logical.esp',
  '&&=': 'keyword.operator.assignment.compound.esp',
  '&=': 'keyword.operator.assignment.compound.bitwise.esp',
  '%': 'keyword.operator.arithmetic.esp',
  '%=': 'keyword.operator.assignment.compound.esp',
  '^': 'keyword.operator.bitwise.esp',
  '^=': 'keyword.operator.assignment.compound.bitwise.esp',
  '+': 'keyword.operator.arithmetic.esp',
  '++': 'keyword.operator.increment.esp',
  '+=': 'keyword.operator.assignment.compound.esp',
  '<': 'keyword.operator.relational.esp',
  '<<': 'keyword.operator.bitwise.shift.esp',
  '<<=': 'keyword.operator.assignment.compound.bitwise.esp',
  '<=': 'keyword.operator.relational.esp',
  '=': 'keyword.operator.assignment.esp',
  '==': 'keyword.operator.comparison.esp',
  '>': 'keyword.operator.relational.esp',
  '>=': 'keyword.operator.relational.esp',
  '>>': 'keyword.operator.bitwise.shift.esp',
  '>>=': 'keyword.operator.assignment.compound.bitwise.esp',
  '>>>': 'keyword.operator.bitwise.shift.esp',
  '>>>=': 'keyword.operator.assignment.compound.bitwise.esp',
  '|': 'keyword.operator.bitwise.esp',
  '|=': 'keyword.operator.assignment.compound.bitwise.esp',
  '||': 'keyword.operator.logical.esp',
  '||=': 'keyword.operator.assignment.compound.esp',
  '~': 'keyword.operator.bitwise.esp',
};

export const PunctuationScopeSelectors: Record<
  Punctuation,
  ESPScopeSelector | null
> = {
  ',': 'punctuation.separator.comma.esp',
  ';': 'punctuation.terminator.statement.esp',
  ':': null,
  '.': 'punctuation.accessor.esp',
  '(': 'meta.brace.round.esp',
  ')': 'meta.brace.round.esp',
  '[': 'meta.brace.square.esp',
  ']': 'meta.brace.square.esp',
  '{': 'punctuation.definition.block.esp',
  '}': 'punctuation.definition.block.esp',
  '#': null,
};
