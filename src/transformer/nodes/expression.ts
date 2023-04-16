import { ESP } from '../../parser';
import { ToESNode } from '../transformer-utils';
import { transformArrayLiteral } from './array-literal';
import { transformAssignmentExpression } from './assignment-expression';
import { transformBinaryExpression } from './binary-expression';
import { transformCallExpression } from './call-expression';
import { transformComputedMemberExpression } from './computed-member-expression';
import { transformConditionalExpression } from './conditional-expression';
import { transformIdentifier } from './identifier';
import { transformLiteral } from './literal';
import { transformNewExpression } from './new-expression';
import { transformObjectLiteral } from './object-literal';
import { transformSetLiteral } from './set-literal';
import { transformStaticMemberExpression } from './static-member-expression';
import { transformUnaryExpression } from './unary-expression';
import { transformUpdateExpression } from './update-expression';

export const transformExpression = <T extends ESP.Expression>(
  node: T,
): ToESNode<T> => {
  switch (node.type) {
    case ESP.NodeType.ArrayLiteral:
      return transformArrayLiteral(node) as ToESNode<T>;
    case ESP.NodeType.AssignmentExpression:
      return transformAssignmentExpression(node) as ToESNode<T>;
    case ESP.NodeType.BinaryExpression:
      return transformBinaryExpression(node) as ToESNode<T>;
    case ESP.NodeType.CallExpression:
      return transformCallExpression(node) as ToESNode<T>;
    case ESP.NodeType.ComputedMemberExpression:
      return transformComputedMemberExpression(node) as ToESNode<T>;
    case ESP.NodeType.ConditionalExpression:
      return transformConditionalExpression(node) as ToESNode<T>;
    case ESP.NodeType.Identifier:
      return transformIdentifier(node) as ToESNode<T>;
    case ESP.NodeType.Literal:
      return transformLiteral(node) as ToESNode<T>;
    case ESP.NodeType.NewExpression:
      return transformNewExpression(node) as ToESNode<T>;
    case ESP.NodeType.ObjectLiteral:
      return transformObjectLiteral(node) as ToESNode<T>;
    case ESP.NodeType.SetLiteral:
      return transformSetLiteral(node) as ToESNode<T>;
    case ESP.NodeType.StaticMemberExpression:
      return transformStaticMemberExpression(node) as ToESNode<T>;
    case ESP.NodeType.UnaryExpression:
      return transformUnaryExpression(node) as ToESNode<T>;
    case ESP.NodeType.UpdateExpression:
      return transformUpdateExpression(node) as ToESNode<T>;
  }
};
