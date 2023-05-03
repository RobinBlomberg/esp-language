import { ES } from '../es-ast';
import { ESP } from '../esp-grammar';
import { transformArrayLiteral } from './nodes/array-literal';
import { transformAssignmentExpression } from './nodes/assignment-expression';
import { transformBinaryExpression } from './nodes/binary-expression';
import { transformBlockStatement } from './nodes/block-statement';
import { transformBreakStatement } from './nodes/break-statement';
import { transformCallExpression } from './nodes/call-expression';
import { transformComputedMemberExpression } from './nodes/computed-member-expression';
import { transformConditionalExpression } from './nodes/conditional-expression';
import { transformContinueStatement } from './nodes/continue-statement';
import { transformDoWhileStatement } from './nodes/do-while-statement';
import { transformExpressionStatement } from './nodes/expression-statement';
import { transformForOfStatement } from './nodes/for-of-statement';
import { transformForStatement } from './nodes/for-statement';
import { transformFunction } from './nodes/function';
import { transformIdentifier } from './nodes/identifier';
import { transformIfStatement } from './nodes/if-statement';
import { transformLiteral } from './nodes/literal';
import { transformMatchStatement } from './nodes/match-statement';
import { transformNewExpression } from './nodes/new-expression';
import { transformObjectLiteral } from './nodes/object-literal';
import { transformReturnStatement } from './nodes/return-statement';
import { transformScript } from './nodes/script';
import { transformSetLiteral } from './nodes/set-literal';
import { transformStaticMemberExpression } from './nodes/static-member-expression';
import { transformThrowStatement } from './nodes/throw-statement';
import { transformUnaryExpression } from './nodes/unary-expression';
import { transformUpdateExpression } from './nodes/update-expression';
import { transformVariableDeclaration } from './nodes/variable-declaration';
import { transformWhileStatement } from './nodes/while-statement';

type ToESNode<T extends ESP.Node> = {
  [ESP.NodeType.ArrayLiteral]: ES.ArrayExpression;
  [ESP.NodeType.AssignmentExpression]: ES.AssignmentExpression;
  [ESP.NodeType.BinaryExpression]: ES.BinaryExpression | ES.LogicalExpression;
  [ESP.NodeType.BlockStatement]: ES.BlockStatement;
  [ESP.NodeType.BreakStatement]: ES.BreakStatement;
  [ESP.NodeType.CallExpression]: ES.CallExpression;
  [ESP.NodeType.ComputedMemberExpression]: ES.MemberExpression;
  [ESP.NodeType.ConditionalExpression]: ES.ConditionalExpression;
  [ESP.NodeType.ContinueStatement]: ES.ContinueStatement;
  [ESP.NodeType.DoWhileStatement]: ES.DoWhileStatement;
  [ESP.NodeType.ExpressionStatement]: ES.ExpressionStatement;
  [ESP.NodeType.ForOfStatement]: ES.ForOfStatement;
  [ESP.NodeType.ForStatement]: ES.ForStatement;
  [ESP.NodeType.Function]: ES.ArrowFunctionExpression;
  [ESP.NodeType.Identifier]: ES.Identifier;
  [ESP.NodeType.IfStatement]: ES.IfStatement;
  [ESP.NodeType.Literal]: ES.Identifier | ES.Literal;
  [ESP.NodeType.MatchStatement]: ES.SwitchStatement;
  [ESP.NodeType.NewExpression]: ES.NewExpression;
  [ESP.NodeType.ObjectLiteral]: ES.ObjectExpression;
  [ESP.NodeType.ReturnStatement]: ES.ReturnStatement;
  [ESP.NodeType.Script]: ES.Program;
  [ESP.NodeType.SetLiteral]: ES.NewExpression;
  [ESP.NodeType.StaticMemberExpression]: ES.MemberExpression;
  [ESP.NodeType.ThrowStatement]: ES.ThrowStatement;
  [ESP.NodeType.UnaryExpression]: ES.UnaryExpression;
  [ESP.NodeType.UpdateExpression]: ES.UpdateExpression;
  [ESP.NodeType.VariableDeclaration]: ES.VariableDeclaration;
  [ESP.NodeType.WhileStatement]: ES.WhileStatement;
}[T['type']];

const transformers: {
  [T in ESP.Node['type']]: Transformer<ESP.NodeMap[T]>;
} = {
  [ESP.NodeType.ArrayLiteral]: transformArrayLiteral,
  [ESP.NodeType.AssignmentExpression]: transformAssignmentExpression,
  [ESP.NodeType.BinaryExpression]: transformBinaryExpression,
  [ESP.NodeType.BlockStatement]: transformBlockStatement,
  [ESP.NodeType.BreakStatement]: transformBreakStatement,
  [ESP.NodeType.CallExpression]: transformCallExpression,
  [ESP.NodeType.ComputedMemberExpression]: transformComputedMemberExpression,
  [ESP.NodeType.ConditionalExpression]: transformConditionalExpression,
  [ESP.NodeType.ContinueStatement]: transformContinueStatement,
  [ESP.NodeType.DoWhileStatement]: transformDoWhileStatement,
  [ESP.NodeType.ExpressionStatement]: transformExpressionStatement,
  [ESP.NodeType.ForOfStatement]: transformForOfStatement,
  [ESP.NodeType.ForStatement]: transformForStatement,
  [ESP.NodeType.Function]: transformFunction,
  [ESP.NodeType.Identifier]: transformIdentifier,
  [ESP.NodeType.IfStatement]: transformIfStatement,
  [ESP.NodeType.Literal]: transformLiteral,
  [ESP.NodeType.MatchStatement]: transformMatchStatement,
  [ESP.NodeType.NewExpression]: transformNewExpression,
  [ESP.NodeType.ObjectLiteral]: transformObjectLiteral,
  [ESP.NodeType.ReturnStatement]: transformReturnStatement,
  [ESP.NodeType.Script]: transformScript,
  [ESP.NodeType.SetLiteral]: transformSetLiteral,
  [ESP.NodeType.StaticMemberExpression]: transformStaticMemberExpression,
  [ESP.NodeType.ThrowStatement]: transformThrowStatement,
  [ESP.NodeType.UnaryExpression]: transformUnaryExpression,
  [ESP.NodeType.UpdateExpression]: transformUpdateExpression,
  [ESP.NodeType.VariableDeclaration]: transformVariableDeclaration,
  [ESP.NodeType.WhileStatement]: transformWhileStatement,
};

export type Transformer<T extends ESP.Node> = (node: T) => ToESNode<T>;

export const transform = <T extends ESP.Node>(node: T) => {
  const transformer = transformers[node.type] as Transformer<ESP.Node>;
  return transformer(node) as ToESNode<T>;
};
