import { ES } from '../../es';
import { Node, NodeMap, NodeType } from '../grammar';
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

type ToESNode<T extends Node> = {
  [NodeType.ArrayLiteral]: ES.AST.ArrayExpression;
  [NodeType.AssignmentExpression]: ES.AST.AssignmentExpression;
  [NodeType.BinaryExpression]:
    | ES.AST.BinaryExpression
    | ES.AST.LogicalExpression;
  [NodeType.BlockStatement]: ES.AST.BlockStatement;
  [NodeType.BreakStatement]: ES.AST.BreakStatement;
  [NodeType.CallExpression]: ES.AST.CallExpression;
  [NodeType.ComputedMemberExpression]: ES.AST.MemberExpression;
  [NodeType.ConditionalExpression]: ES.AST.ConditionalExpression;
  [NodeType.ContinueStatement]: ES.AST.ContinueStatement;
  [NodeType.DoWhileStatement]: ES.AST.DoWhileStatement;
  [NodeType.ExpressionStatement]: ES.AST.ExpressionStatement;
  [NodeType.ForOfStatement]: ES.AST.ForOfStatement;
  [NodeType.ForStatement]: ES.AST.ForStatement;
  [NodeType.Function]: ES.AST.ArrowFunctionExpression;
  [NodeType.Identifier]: ES.AST.Identifier;
  [NodeType.IfStatement]: ES.AST.IfStatement;
  [NodeType.Literal]: ES.AST.Identifier | ES.AST.Literal;
  [NodeType.MatchStatement]: ES.AST.SwitchStatement;
  [NodeType.NewExpression]: ES.AST.NewExpression;
  [NodeType.ObjectLiteral]: ES.AST.ObjectExpression;
  [NodeType.ReturnStatement]: ES.AST.ReturnStatement;
  [NodeType.Script]: ES.AST.Program;
  [NodeType.SetLiteral]: ES.AST.NewExpression;
  [NodeType.StaticMemberExpression]: ES.AST.MemberExpression;
  [NodeType.ThrowStatement]: ES.AST.ThrowStatement;
  [NodeType.UnaryExpression]: ES.AST.UnaryExpression;
  [NodeType.UpdateExpression]: ES.AST.UpdateExpression;
  [NodeType.VariableDeclaration]: ES.AST.VariableDeclaration;
  [NodeType.WhileStatement]: ES.AST.WhileStatement;
}[T['type']];

const transformers: {
  [T in Node['type']]: Transformer<NodeMap[T]>;
} = {
  [NodeType.ArrayLiteral]: transformArrayLiteral,
  [NodeType.AssignmentExpression]: transformAssignmentExpression,
  [NodeType.BinaryExpression]: transformBinaryExpression,
  [NodeType.BlockStatement]: transformBlockStatement,
  [NodeType.BreakStatement]: transformBreakStatement,
  [NodeType.CallExpression]: transformCallExpression,
  [NodeType.ComputedMemberExpression]: transformComputedMemberExpression,
  [NodeType.ConditionalExpression]: transformConditionalExpression,
  [NodeType.ContinueStatement]: transformContinueStatement,
  [NodeType.DoWhileStatement]: transformDoWhileStatement,
  [NodeType.ExpressionStatement]: transformExpressionStatement,
  [NodeType.ForOfStatement]: transformForOfStatement,
  [NodeType.ForStatement]: transformForStatement,
  [NodeType.Function]: transformFunction,
  [NodeType.Identifier]: transformIdentifier,
  [NodeType.IfStatement]: transformIfStatement,
  [NodeType.Literal]: transformLiteral,
  [NodeType.MatchStatement]: transformMatchStatement,
  [NodeType.NewExpression]: transformNewExpression,
  [NodeType.ObjectLiteral]: transformObjectLiteral,
  [NodeType.ReturnStatement]: transformReturnStatement,
  [NodeType.Script]: transformScript,
  [NodeType.SetLiteral]: transformSetLiteral,
  [NodeType.StaticMemberExpression]: transformStaticMemberExpression,
  [NodeType.ThrowStatement]: transformThrowStatement,
  [NodeType.UnaryExpression]: transformUnaryExpression,
  [NodeType.UpdateExpression]: transformUpdateExpression,
  [NodeType.VariableDeclaration]: transformVariableDeclaration,
  [NodeType.WhileStatement]: transformWhileStatement,
};

export type Transformer<T extends Node> = (node: T) => ToESNode<T>;

export const transform = <T extends Node>(node: T) => {
  const transformer = transformers[node.type] as Transformer<Node>;
  return transformer(node) as ToESNode<T>;
};
