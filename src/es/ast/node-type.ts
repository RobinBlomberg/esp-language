/**
 * @see https://github.com/estree/estree/blob/master/es5.md
 * @see https://github.com/estree/estree/blob/master/es2015.md
 * @see https://github.com/estree/estree/blob/master/es2017.md
 * @see https://github.com/estree/estree/blob/master/es2020.md
 * @see https://github.com/estree/estree/blob/master/es2022.md
 */
export const enum NodeType {
  /*
   * ES5
   */
  Identifier = 'Identifier',
  Literal = 'Literal',
  Program = 'Program',
  ExpressionStatement = 'ExpressionStatement',
  BlockStatement = 'BlockStatement',
  EmptyStatement = 'EmptyStatement',
  DebuggerStatement = 'DebuggerStatement',
  WithStatement = 'WithStatement',
  ReturnStatement = 'ReturnStatement',
  LabeledStatement = 'LabeledStatement',
  BreakStatement = 'BreakStatement',
  ContinueStatement = 'ContinueStatement',
  IfStatement = 'IfStatement',
  SwitchStatement = 'SwitchStatement',
  SwitchCase = 'SwitchCase',
  ThrowStatement = 'ThrowStatement',
  TryStatement = 'TryStatement',
  CatchClause = 'CatchClause',
  WhileStatement = 'WhileStatement',
  DoWhileStatement = 'DoWhileStatement',
  ForStatement = 'ForStatement',
  ForInStatement = 'ForInStatement',
  FunctionDeclaration = 'FunctionDeclaration',
  VariableDeclaration = 'VariableDeclaration',
  VariableDeclarator = 'VariableDeclarator',
  ThisExpression = 'ThisExpression',
  ArrayExpression = 'ArrayExpression',
  ObjectExpression = 'ObjectExpression',
  Property = 'Property',
  FunctionExpression = 'FunctionExpression',
  UnaryExpression = 'UnaryExpression',
  UpdateExpression = 'UpdateExpression',
  BinaryExpression = 'BinaryExpression',
  AssignmentExpression = 'AssignmentExpression',
  LogicalExpression = 'LogicalExpression',
  MemberExpression = 'MemberExpression',
  ConditionalExpression = 'ConditionalExpression',
  CallExpression = 'CallExpression',
  NewExpression = 'NewExpression',
  SequenceExpression = 'SequenceExpression',
  /*
   * ES2015
   */
  ForOfStatement = 'ForOfStatement',
  Super = 'Super',
  SpreadElement = 'SpreadElement',
  ArrowFunctionExpression = 'ArrowFunctionExpression',
  YieldExpression = 'YieldExpression',
  TemplateLiteral = 'TemplateLiteral',
  TaggedTemplateExpression = 'TaggedTemplateExpression',
  TemplateElement = 'TemplateElement',
  ObjectPattern = 'ObjectPattern',
  ArrayPattern = 'ArrayPattern',
  RestElement = 'RestElement',
  AssignmentPattern = 'AssignmentPattern',
  ClassBody = 'ClassBody',
  MethodDefinition = 'MethodDefinition',
  ClassDeclaration = 'ClassDeclaration',
  ClassExpression = 'ClassExpression',
  MetaProperty = 'MetaProperty',
  ImportDeclaration = 'ImportDeclaration',
  ImportSpecifier = 'ImportSpecifier',
  ImportDefaultSpecifier = 'ImportDefaultSpecifier',
  ImportNamespaceSpecifier = 'ImportNamespaceSpecifier',
  ExportNamedDeclaration = 'ExportNamedDeclaration',
  ExportSpecifier = 'ExportSpecifier',
  ExportDefaultDeclaration = 'ExportDefaultDeclaration',
  ExportAllDeclaration = 'ExportAllDeclaration',
  /*
   * ES2017
   */
  AwaitExpression = 'AwaitExpression',
  /*
   * ES2020
   */
  ChainExpression = 'ChainExpression',
  ImportExpression = 'ImportExpression',
  /*
   * ES2022
   */
  PropertyDefinition = 'PropertyDefinition',
  PrivateIdentifier = 'PrivateIdentifier',
  StaticBlock = 'StaticBlock',
}
