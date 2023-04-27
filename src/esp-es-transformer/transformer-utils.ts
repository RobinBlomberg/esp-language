import { ES } from '../es-ast';
import { ESP } from '../esp-parser';

export type ToESNode<T extends ESP.Node> = {
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
  [ESP.NodeType.Identifier]: ES.Identifier;
  [ESP.NodeType.IfStatement]: ES.IfStatement;
  [ESP.NodeType.Literal]: ES.Identifier | ES.Literal;
  [ESP.NodeType.MatchCase]: ES.IfStatement;
  [ESP.NodeType.MatchStatement]: ES.SwitchStatement;
  [ESP.NodeType.NewExpression]: ES.NewExpression;
  [ESP.NodeType.ObjectLiteral]: ES.ObjectExpression;
  [ESP.NodeType.Property]: ES.Property;
  [ESP.NodeType.ReturnStatement]: ES.ReturnStatement;
  [ESP.NodeType.Script]: ES.Program;
  [ESP.NodeType.SetLiteral]: ES.NewExpression;
  [ESP.NodeType.StaticMemberExpression]: ES.MemberExpression;
  [ESP.NodeType.ThrowStatement]: ES.ThrowStatement;
  [ESP.NodeType.UnaryExpression]: ES.UnaryExpression;
  [ESP.NodeType.UnionClause]: unknown;
  [ESP.NodeType.UpdateExpression]: ES.UpdateExpression;
  [ESP.NodeType.VariableDeclaration]: ES.VariableDeclaration;
  [ESP.NodeType.WhileStatement]: ES.WhileStatement;
}[T['type']];

export type Transformer<T extends ESP.Node> = (node: T) => ToESNode<T>;
