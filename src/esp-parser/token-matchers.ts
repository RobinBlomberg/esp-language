import { ControlKeyword, Keyword } from '../esp-grammar';
import { TokenType } from '../esp-lexer';
import { IR } from '../ir-ast';

export const AssignmentOperatorTokenMatcher = {
  [TokenType.Punctuator]: IR.AssignmentOperator,
};

export const ForStatementInitTokenMatcher = {
  [TokenType.Keyword]: [Keyword.Of] as [ControlKeyword.Of],
  [TokenType.Punctuator]: ['='] as ['='],
};

export const UnaryOperatorTokenMatcher = {
  [TokenType.Punctuator]: IR.UnaryOperator,
};

export const UpdateOperatorTokenMatcher = {
  [TokenType.Punctuator]: IR.UpdateOperator,
};

export const VariableKindTokenMatcher = {
  [TokenType.Keyword]: ['const', 'let'] as ['const', 'let'],
};
