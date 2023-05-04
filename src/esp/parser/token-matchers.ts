import {
  AssignmentOperator,
  ControlKeyword,
  Keyword,
  UnaryOperator,
  UpdateOperator,
  VariableKind,
} from '../grammar';
import { TokenType } from '../lexer';

export const AssignmentOperatorTokenMatcher = {
  [TokenType.Punctuator]: AssignmentOperator,
};

export const ForStatementInitTokenMatcher = {
  [TokenType.Keyword]: [Keyword.Of] as [ControlKeyword.Of],
  [TokenType.Punctuator]: ['='] as ['='],
};

export const MemberExpressionOpenTokenMatcher = {
  [TokenType.Punctuator]: ['.', '[', '('] as ['.', '[', '('],
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
