import { ES } from '../es-ast';
import { IR } from '../ir-ast';
import { transformArrayLiteral } from './nodes/array-literal';
import { transformAssignmentExpression } from './nodes/assignment-expression';
import { transformBinaryExpression } from './nodes/binary-expression';
import { transformBlockStatement } from './nodes/block-statement';
import { transformBreakStatement } from './nodes/break-statement';
import { transformCallExpression } from './nodes/call-expression';
import { transformConditionalExpression } from './nodes/conditional-expression';
import { transformContinueStatement } from './nodes/continue-statement';
import { transformDoWhileStatement } from './nodes/do-while-statement';
import { transformExpressionStatement } from './nodes/expression-statement';
import { transformForOfStatement } from './nodes/for-of-statement';
import { transformFunction } from './nodes/function';
import { transformIdentifier } from './nodes/identifier';
import { transformIfStatement } from './nodes/if-statement';
import { transformLiteral } from './nodes/literal';
import { transformLoopStatement } from './nodes/loop-statement';
import { transformMatchStatement } from './nodes/match-statement';
import { transformMemberExpression } from './nodes/member-expression';
import { transformNewExpression } from './nodes/new-expression';
import { transformObjectLiteral } from './nodes/object-literal';
import { transformReturnStatement } from './nodes/return-statement';
import { transformScript } from './nodes/script';
import { transformSetLiteral } from './nodes/set-literal';
import { transformThrowStatement } from './nodes/throw-statement';
import { transformUnaryExpression } from './nodes/unary-expression';
import { transformUpdateExpression } from './nodes/update-expression';
import { transformVariableDeclaration } from './nodes/variable-declaration';

type ToESNode<T extends IR.Node> = {
  [IR.NodeType.ArrayLiteral]: ES.ArrayExpression;
  [IR.NodeType.AssignmentExpression]: ES.AssignmentExpression;
  [IR.NodeType.BinaryExpression]: ES.BinaryExpression | ES.LogicalExpression;
  [IR.NodeType.BlockStatement]: ES.BlockStatement;
  [IR.NodeType.BreakStatement]: ES.BreakStatement;
  [IR.NodeType.CallExpression]: ES.CallExpression;
  [IR.NodeType.ConditionalExpression]: ES.ConditionalExpression;
  [IR.NodeType.ContinueStatement]: ES.ContinueStatement;
  [IR.NodeType.DoWhileStatement]: ES.DoWhileStatement;
  [IR.NodeType.ExpressionStatement]: ES.ExpressionStatement;
  [IR.NodeType.ForOfStatement]: ES.ForOfStatement;
  [IR.NodeType.Function]: ES.ArrowFunctionExpression;
  [IR.NodeType.Identifier]: ES.Identifier;
  [IR.NodeType.IfStatement]: ES.IfStatement;
  [IR.NodeType.Literal]: ES.Identifier | ES.Literal;
  [IR.NodeType.LoopStatement]: ES.ForStatement | ES.WhileStatement;
  [IR.NodeType.MatchStatement]: ES.SwitchStatement;
  [IR.NodeType.MemberExpression]: ES.MemberExpression;
  [IR.NodeType.NewExpression]: ES.NewExpression;
  [IR.NodeType.ObjectLiteral]: ES.ObjectExpression;
  [IR.NodeType.ReturnStatement]: ES.ReturnStatement;
  [IR.NodeType.Script]: ES.Program;
  [IR.NodeType.SetLiteral]: ES.NewExpression;
  [IR.NodeType.ThrowStatement]: ES.ThrowStatement;
  [IR.NodeType.UnaryExpression]: ES.UnaryExpression;
  [IR.NodeType.UpdateExpression]: ES.UpdateExpression;
  [IR.NodeType.VariableDeclaration]: ES.VariableDeclaration;
}[T['type']];

const transformers: {
  [T in IR.Node['type']]: Transformer<IR.NodeMap[T]>;
} = {
  [IR.NodeType.ArrayLiteral]: transformArrayLiteral,
  [IR.NodeType.AssignmentExpression]: transformAssignmentExpression,
  [IR.NodeType.BinaryExpression]: transformBinaryExpression,
  [IR.NodeType.BlockStatement]: transformBlockStatement,
  [IR.NodeType.BreakStatement]: transformBreakStatement,
  [IR.NodeType.CallExpression]: transformCallExpression,
  [IR.NodeType.ConditionalExpression]: transformConditionalExpression,
  [IR.NodeType.ContinueStatement]: transformContinueStatement,
  [IR.NodeType.DoWhileStatement]: transformDoWhileStatement,
  [IR.NodeType.ExpressionStatement]: transformExpressionStatement,
  [IR.NodeType.ForOfStatement]: transformForOfStatement,
  [IR.NodeType.Function]: transformFunction,
  [IR.NodeType.Identifier]: transformIdentifier,
  [IR.NodeType.IfStatement]: transformIfStatement,
  [IR.NodeType.Literal]: transformLiteral,
  [IR.NodeType.LoopStatement]: transformLoopStatement,
  [IR.NodeType.MatchStatement]: transformMatchStatement,
  [IR.NodeType.MemberExpression]: transformMemberExpression,
  [IR.NodeType.NewExpression]: transformNewExpression,
  [IR.NodeType.ObjectLiteral]: transformObjectLiteral,
  [IR.NodeType.ReturnStatement]: transformReturnStatement,
  [IR.NodeType.Script]: transformScript,
  [IR.NodeType.SetLiteral]: transformSetLiteral,
  [IR.NodeType.ThrowStatement]: transformThrowStatement,
  [IR.NodeType.UnaryExpression]: transformUnaryExpression,
  [IR.NodeType.UpdateExpression]: transformUpdateExpression,
  [IR.NodeType.VariableDeclaration]: transformVariableDeclaration,
};

export type Transformer<T extends IR.Node> = (node: T) => ToESNode<T>;

export const transform = <T extends IR.Node>(node: T) => {
  const transformer = transformers[node.type] as Transformer<IR.Node>;
  return transformer(node) as ToESNode<T>;
};
