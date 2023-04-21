import { Node, NodeMap, NodeType } from '../es-ast';
import { writeArrayExpression } from './nodes/array-expression';
import { writeArrayPattern } from './nodes/array-pattern';
import { writeArrowFunctionExpression } from './nodes/arrow-function-expression';
import { writeAssignmentExpression } from './nodes/assignment-expression';
import { writeAssignmentPattern } from './nodes/assignment-pattern';
import { writeAwaitExpression } from './nodes/await-expression';
import { writeBinaryExpression } from './nodes/binary-expression';
import { writeBlockStatement } from './nodes/block-statement';
import { writeBreakStatement } from './nodes/break-statement';
import { writeCallExpression } from './nodes/call-expression';
import { writeCatchClause } from './nodes/catch-clause';
import { writeChainExpression } from './nodes/chain-expression';
import { writeClassBody } from './nodes/class-body';
import { writeClassDeclaration } from './nodes/class-declaration';
import { writeClassExpression } from './nodes/class-expression';
import { writeConditionalExpression } from './nodes/conditional-expression';
import { writeContinueStatement } from './nodes/continue-statement';
import { writeDebuggerStatement } from './nodes/debugger-statement';
import { writeDoWhileStatement } from './nodes/do-while-statement';
import { writeEmptyStatement } from './nodes/empty-statement';
import { writeExportAllDeclaration } from './nodes/export-all-declaration';
import { writeExportDefaultDeclaration } from './nodes/export-default-declaration';
import { writeExportNamedDeclaration } from './nodes/export-named-declaration';
import { writeExportSpecifier } from './nodes/export-specifier';
import { writeExpressionStatement } from './nodes/expression-statement';
import { writeForInStatement } from './nodes/for-in-statement';
import { writeForOfStatement } from './nodes/for-of-statement';
import { writeForStatement } from './nodes/for-statement';
import { writeFunctionDeclaration } from './nodes/function-declaration';
import { writeFunctionExpression } from './nodes/function-expression';
import { writeIdentifier } from './nodes/identifier';
import { writeIfStatement } from './nodes/if-statement';
import { writeImportDeclaration } from './nodes/import-declaration';
import { writeImportDefaultSpecifier } from './nodes/import-default-specifier';
import { writeImportExpression } from './nodes/import-expression';
import { writeImportNamespaceSpecifier } from './nodes/import-namespace-specifier';
import { writeImportSpecifier } from './nodes/import-specifier';
import { writeLabeledStatement } from './nodes/labeled-statement';
import { writeLiteral } from './nodes/literal';
import { writeLogicalExpression } from './nodes/logical-expression';
import { writeMemberExpression } from './nodes/member-expression';
import { writeMetaProperty } from './nodes/meta-property';
import { writeMethodDefinition } from './nodes/method-definition';
import { writeNewExpression } from './nodes/new-expression';
import { writeObjectExpression } from './nodes/object-expression';
import { writeObjectPattern } from './nodes/object-pattern';
import { writePrivateIdentifier } from './nodes/private-identifier';
import { writeProgram } from './nodes/program';
import { writeProperty } from './nodes/property';
import { writePropertyDefinition } from './nodes/property-definition';
import { writeRestElement } from './nodes/rest-element';
import { writeReturnStatement } from './nodes/return-statement';
import { writeSequenceExpression } from './nodes/sequence-expression';
import { writeSpreadElement } from './nodes/spread-element';
import { writeStaticBlock } from './nodes/static-block';
import { writeSuper } from './nodes/super';
import { writeSwitchCase } from './nodes/switch-case';
import { writeSwitchStatement } from './nodes/switch-statement';
import { writeTaggedTemplateExpression } from './nodes/tagged-template-expression';
import { writeTemplateElement } from './nodes/template-element';
import { writeTemplateLiteral } from './nodes/template-literal';
import { writeThisExpression } from './nodes/this-expression';
import { writeThrowStatement } from './nodes/throw-statement';
import { writeTryStatement } from './nodes/try-statement';
import { writeUnaryExpression } from './nodes/unary-expression';
import { writeUpdateExpression } from './nodes/update-expression';
import { writeVariableDeclaration } from './nodes/variable-declaration';
import { writeVariableDeclarator } from './nodes/variable-declarator';
import { writeWhileStatement } from './nodes/while-statement';
import { writeWithStatement } from './nodes/with-statement';
import { writeYieldExpression } from './nodes/yield-expression';
import { isIdentifierStart, isReservedWordPartChar } from './writer-utils';

const writers: { [K in NodeType]: Writer<NodeMap[K]> } = {
  [NodeType.ArrayExpression]: writeArrayExpression,
  [NodeType.ArrayPattern]: writeArrayPattern,
  [NodeType.ArrowFunctionExpression]: writeArrowFunctionExpression,
  [NodeType.AssignmentExpression]: writeAssignmentExpression,
  [NodeType.AssignmentPattern]: writeAssignmentPattern,
  [NodeType.AwaitExpression]: writeAwaitExpression,
  [NodeType.BinaryExpression]: writeBinaryExpression,
  [NodeType.BlockStatement]: writeBlockStatement,
  [NodeType.BreakStatement]: writeBreakStatement,
  [NodeType.CallExpression]: writeCallExpression,
  [NodeType.CatchClause]: writeCatchClause,
  [NodeType.ChainExpression]: writeChainExpression,
  [NodeType.ClassBody]: writeClassBody,
  [NodeType.ClassDeclaration]: writeClassDeclaration,
  [NodeType.ClassExpression]: writeClassExpression,
  [NodeType.ConditionalExpression]: writeConditionalExpression,
  [NodeType.ContinueStatement]: writeContinueStatement,
  [NodeType.DebuggerStatement]: writeDebuggerStatement,
  [NodeType.DoWhileStatement]: writeDoWhileStatement,
  [NodeType.EmptyStatement]: writeEmptyStatement,
  [NodeType.ExportAllDeclaration]: writeExportAllDeclaration,
  [NodeType.ExportDefaultDeclaration]: writeExportDefaultDeclaration,
  [NodeType.ExportNamedDeclaration]: writeExportNamedDeclaration,
  [NodeType.ExportSpecifier]: writeExportSpecifier,
  [NodeType.ExpressionStatement]: writeExpressionStatement,
  [NodeType.ForInStatement]: writeForInStatement,
  [NodeType.ForOfStatement]: writeForOfStatement,
  [NodeType.ForStatement]: writeForStatement,
  [NodeType.FunctionDeclaration]: writeFunctionDeclaration,
  [NodeType.FunctionExpression]: writeFunctionExpression,
  [NodeType.Identifier]: writeIdentifier,
  [NodeType.IfStatement]: writeIfStatement,
  [NodeType.ImportDeclaration]: writeImportDeclaration,
  [NodeType.ImportDefaultSpecifier]: writeImportDefaultSpecifier,
  [NodeType.ImportExpression]: writeImportExpression,
  [NodeType.ImportNamespaceSpecifier]: writeImportNamespaceSpecifier,
  [NodeType.ImportSpecifier]: writeImportSpecifier,
  [NodeType.LabeledStatement]: writeLabeledStatement,
  [NodeType.Literal]: writeLiteral,
  [NodeType.LogicalExpression]: writeLogicalExpression,
  [NodeType.MemberExpression]: writeMemberExpression,
  [NodeType.MetaProperty]: writeMetaProperty,
  [NodeType.MethodDefinition]: writeMethodDefinition,
  [NodeType.NewExpression]: writeNewExpression,
  [NodeType.ObjectExpression]: writeObjectExpression,
  [NodeType.ObjectPattern]: writeObjectPattern,
  [NodeType.PrivateIdentifier]: writePrivateIdentifier,
  [NodeType.Program]: writeProgram,
  [NodeType.Property]: writeProperty,
  [NodeType.PropertyDefinition]: writePropertyDefinition,
  [NodeType.RestElement]: writeRestElement,
  [NodeType.ReturnStatement]: writeReturnStatement,
  [NodeType.SequenceExpression]: writeSequenceExpression,
  [NodeType.SpreadElement]: writeSpreadElement,
  [NodeType.StaticBlock]: writeStaticBlock,
  [NodeType.Super]: writeSuper,
  [NodeType.SwitchCase]: writeSwitchCase,
  [NodeType.SwitchStatement]: writeSwitchStatement,
  [NodeType.TaggedTemplateExpression]: writeTaggedTemplateExpression,
  [NodeType.TemplateElement]: writeTemplateElement,
  [NodeType.TemplateLiteral]: writeTemplateLiteral,
  [NodeType.ThisExpression]: writeThisExpression,
  [NodeType.ThrowStatement]: writeThrowStatement,
  [NodeType.TryStatement]: writeTryStatement,
  [NodeType.UnaryExpression]: writeUnaryExpression,
  [NodeType.UpdateExpression]: writeUpdateExpression,
  [NodeType.VariableDeclaration]: writeVariableDeclaration,
  [NodeType.VariableDeclarator]: writeVariableDeclarator,
  [NodeType.WhileStatement]: writeWhileStatement,
  [NodeType.WithStatement]: writeWithStatement,
  [NodeType.YieldExpression]: writeYieldExpression,
};

export type Writer<T extends Node> = (
  node: T,
  write: (input: Node | string) => void,
) => void;

export const serialize = (node: Node) => {
  let data = '';

  const write = (input: Node | string) => {
    if (typeof input === 'string') {
      if (
        isReservedWordPartChar(data[data.length - 1]!) &&
        isIdentifierStart(input[0]!)
      ) {
        data += ' ';
      }

      data += input;
    } else {
      (writers[input.type] as Writer<Node>)(input, write);
    }
  };

  (writers[node.type] as Writer<Node>)(node, write);

  return data;
};
