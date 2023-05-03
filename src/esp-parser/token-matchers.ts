import { ControlKeyword, Keyword } from '../esp-grammar';
import {
  AssignmentOperator,
  UnaryOperator,
  UpdateOperator,
  VariableKind,
} from '../esp-grammar/ast';
import { TokenType } from '../esp-lexer';

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
