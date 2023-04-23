import {
  Expression,
  NodeType,
  PrivateIdentifier,
  SpreadElement,
  Super,
} from '../es-ast';

/**
 * The expression precedence can be deduced by following the productions starting from
 * {@link https://tc39.es/ecma262/#prod-Expression Expression}.
 *
 * The same precedence mapping can be found at
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence#table | Operator precedence - Javascript | MDN} as a reference.
 */
export const getExpressionPrecedence = (
  node: Expression | PrivateIdentifier | SpreadElement | Super,
) => {
  switch (node.type) {
    case NodeType.SequenceExpression:
      return 0;
    case NodeType.ConditionalExpression:
    case NodeType.YieldExpression:
    case NodeType.ArrowFunctionExpression:
    case NodeType.AssignmentExpression:
      return 1;
    case NodeType.LogicalExpression:
      switch (node.operator) {
        case '||':
        case '??':
          return 2;
        case '&&':
        default:
          return 3;
      }
    case NodeType.BinaryExpression:
      switch (node.operator) {
        case '|':
          return 4;
        case '^':
          return 5;
        case '&':
          return 6;
        case '==':
        case '!=':
        case '===':
        case '!==':
          return 7;
        case '<':
        case '>':
        case '<=':
        case '>=':
        case 'instanceof':
        case 'in':
          return 8;
        case '<<':
        case '>>':
        case '>>>':
          return 9;
        case '+':
        case '-':
          return 10;
        case '*':
        case '/':
        case '%':
          return 11;
        case '**':
        default:
          return 12;
      }
    case NodeType.UnaryExpression:
    case NodeType.AwaitExpression:
      return 13;
    case NodeType.UpdateExpression:
      return node.prefix ? 13 : 14;
    // NOTE: `new A()` should have higher precedence than `new A`, but ESTree does not distinguish
    // between the two.
    case NodeType.NewExpression:
    case NodeType.CallExpression:
    case NodeType.ImportExpression:
    case NodeType.TaggedTemplateExpression:
    case NodeType.ChainExpression:
      return 15;
    case NodeType.MemberExpression:
    case NodeType.MetaProperty:
      return 16;
    case NodeType.ArrayExpression:
    case NodeType.ObjectExpression:
    case NodeType.FunctionExpression:
    case NodeType.ClassExpression:
    case NodeType.TemplateLiteral:
      return 17;
    case NodeType.ThisExpression:
    case NodeType.Identifier:
    case NodeType.Literal:
    default:
      return 18;
  }
};
