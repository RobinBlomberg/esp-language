import { ESP } from '../../parser';
import { ToESNode } from '../transformer-utils';
import { transformBlockStatement } from './block-statement';
import { transformBreakStatement } from './break-statement';
import { transformContinueStatement } from './continue-statement';
import { transformDoWhileStatement } from './do-while-statement';
import { transformExpressionStatement } from './expression-statement';
import { transformIfStatement } from './if-statement';
import { transformMatchStatement } from './match-statement';
import { transformReturnStatement } from './return-statement';
import { transformThrowStatement } from './throw-statement';
import { transformVariableDeclaration } from './variable-declaration';
import { transformWhileStatement } from './while-statement';

export const transformStatement = <T extends ESP.Statement>(
  node: T,
): ToESNode<T> => {
  switch (node.type) {
    case ESP.NodeType.BlockStatement:
      return transformBlockStatement(node) as ToESNode<T>;
    case ESP.NodeType.BreakStatement:
      return transformBreakStatement(node) as ToESNode<T>;
    case ESP.NodeType.ContinueStatement:
      return transformContinueStatement(node) as ToESNode<T>;
    case ESP.NodeType.DoWhileStatement:
      return transformDoWhileStatement(node) as ToESNode<T>;
    case ESP.NodeType.ExpressionStatement:
      return transformExpressionStatement(node) as ToESNode<T>;
    case ESP.NodeType.IfStatement:
      return transformIfStatement(node) as ToESNode<T>;
    case ESP.NodeType.MatchStatement:
      return transformMatchStatement(node) as ToESNode<T>;
    case ESP.NodeType.ReturnStatement:
      return transformReturnStatement(node) as ToESNode<T>;
    case ESP.NodeType.ThrowStatement:
      return transformThrowStatement(node) as ToESNode<T>;
    case ESP.NodeType.VariableDeclaration:
      return transformVariableDeclaration(node) as ToESNode<T>;
    case ESP.NodeType.WhileStatement:
      return transformWhileStatement(node) as ToESNode<T>;
  }
};
