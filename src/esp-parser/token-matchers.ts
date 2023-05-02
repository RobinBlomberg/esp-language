import { ControlKeyword, Keyword } from '../esp-grammar';
import { TokenType } from '../esp-lexer';
import {
  AssignmentOperator,
  UnaryOperator,
  UpdateOperator,
  VariableKind,
} from './ast';

export const AssignmentOperatorTokenMatcher = {
  [TokenType.Punctuator]: AssignmentOperator,
};

export const ForStatementInitTokenMatcher = {
  [TokenType.Keyword]: [Keyword.Of] as [ControlKeyword.Of],
  [TokenType.Punctuator]: ['='] as ['='],
};

export const UnaryOperatorTokenMatcher = {
  [TokenType.Punctuator]: UnaryOperator,
};

export const UpdateOperatorTokenMatcher = {
  [TokenType.Punctuator]: UpdateOperator,
};

export const VariableKindTokenMatcher = {
  [TokenType.Keyword]: VariableKind,
};
