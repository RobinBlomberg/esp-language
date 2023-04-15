import { NodeType } from './node-type';

/*
 * ES5
 * -------------------------------------------------------------------------------------------------
 */

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#node-objects
 */
export type Node =
  | Program
  | Function
  | Statement
  | SwitchCase
  | CatchClause
  | VariableDeclarator
  | Expression
  | Property
  | Pattern
  | Super
  | SpreadElement
  | TemplateElement
  | Class
  | ClassBody
  | MethodDefinition
  | ImportOrExportDeclaration
  | ModuleSpecifier
  | ChainElement
  | PropertyDefinition
  | PrivateIdentifier;

export const Node = <T extends NodeType>(
  type: T,
  properties: Omit<NodeMap[T], 'type'>,
) => {
  return { type, ...properties } as NodeMap[T];
};

export type NodeMap = {
  [NodeType.Identifier]: Identifier;
  [NodeType.Literal]: Literal;
  [NodeType.Program]: Program;
  [NodeType.ExpressionStatement]: ExpressionStatement;
  [NodeType.BlockStatement]: BlockStatement;
  [NodeType.EmptyStatement]: EmptyStatement;
  [NodeType.DebuggerStatement]: DebuggerStatement;
  [NodeType.WithStatement]: WithStatement;
  [NodeType.ReturnStatement]: ReturnStatement;
  [NodeType.LabeledStatement]: LabeledStatement;
  [NodeType.BreakStatement]: BreakStatement;
  [NodeType.ContinueStatement]: ContinueStatement;
  [NodeType.IfStatement]: IfStatement;
  [NodeType.SwitchStatement]: SwitchStatement;
  [NodeType.SwitchCase]: SwitchCase;
  [NodeType.ThrowStatement]: ThrowStatement;
  [NodeType.TryStatement]: TryStatement;
  [NodeType.CatchClause]: CatchClause;
  [NodeType.WhileStatement]: WhileStatement;
  [NodeType.DoWhileStatement]: DoWhileStatement;
  [NodeType.ForStatement]: ForStatement;
  [NodeType.ForInStatement]: ForInStatement;
  [NodeType.FunctionDeclaration]: FunctionDeclaration;
  [NodeType.VariableDeclaration]: VariableDeclaration;
  [NodeType.VariableDeclarator]: VariableDeclarator;
  [NodeType.ThisExpression]: ThisExpression;
  [NodeType.ArrayExpression]: ArrayExpression;
  [NodeType.ObjectExpression]: ObjectExpression;
  [NodeType.Property]: Property;
  [NodeType.FunctionExpression]: FunctionExpression;
  [NodeType.UnaryExpression]: UnaryExpression;
  [NodeType.UpdateExpression]: UpdateExpression;
  [NodeType.BinaryExpression]: BinaryExpression;
  [NodeType.AssignmentExpression]: AssignmentExpression;
  [NodeType.LogicalExpression]: LogicalExpression;
  [NodeType.MemberExpression]: MemberExpression;
  [NodeType.ConditionalExpression]: ConditionalExpression;
  [NodeType.CallExpression]: CallExpression;
  [NodeType.NewExpression]: NewExpression;
  [NodeType.SequenceExpression]: SequenceExpression;
  [NodeType.ForOfStatement]: ForOfStatement;
  [NodeType.Super]: Super;
  [NodeType.SpreadElement]: SpreadElement;
  [NodeType.ArrowFunctionExpression]: ArrowFunctionExpression;
  [NodeType.YieldExpression]: YieldExpression;
  [NodeType.TemplateLiteral]: TemplateLiteral;
  [NodeType.TaggedTemplateExpression]: TaggedTemplateExpression;
  [NodeType.TemplateElement]: TemplateElement;
  [NodeType.ObjectPattern]: ObjectPattern;
  [NodeType.ArrayPattern]: ArrayPattern;
  [NodeType.RestElement]: RestElement;
  [NodeType.AssignmentPattern]: AssignmentPattern;
  [NodeType.ClassBody]: ClassBody;
  [NodeType.MethodDefinition]: MethodDefinition;
  [NodeType.ClassDeclaration]: ClassDeclaration;
  [NodeType.ClassExpression]: ClassExpression;
  [NodeType.MetaProperty]: MetaProperty;
  [NodeType.ImportDeclaration]: ImportDeclaration;
  [NodeType.ImportSpecifier]: ImportSpecifier;
  [NodeType.ImportDefaultSpecifier]: ImportDefaultSpecifier;
  [NodeType.ImportNamespaceSpecifier]: ImportNamespaceSpecifier;
  [NodeType.ExportNamedDeclaration]: ExportNamedDeclaration;
  [NodeType.ExportSpecifier]: ExportSpecifier;
  [NodeType.ExportDefaultDeclaration]: ExportDefaultDeclaration;
  [NodeType.ExportAllDeclaration]: ExportAllDeclaration;
  [NodeType.AwaitExpression]: AwaitExpression;
  [NodeType.ChainExpression]: ChainExpression;
  [NodeType.ImportExpression]: ImportExpression;
  [NodeType.PropertyDefinition]: PropertyDefinition;
  [NodeType.PrivateIdentifier]: PrivateIdentifier;
  [NodeType.StaticBlock]: StaticBlock;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#identifier
 */
export type Identifier = {
  type: NodeType.Identifier;
  name: string;
};

export const Identifier = (name: string) => Node(NodeType.Identifier, { name });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#literal
 * @see https://github.com/estree/estree/blob/master/es2020.md#literal
 */
export type Literal = {
  type: NodeType.Literal;
  value:
    | string
    | boolean
    | null
    | number
    | RegExp
    /*
     * ES2020
     */
    | bigint;
};

export const Literal = (
  value: string | boolean | null | number | RegExp | bigint,
) => Node(NodeType.Literal, { value });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#programs
 * @see https://github.com/estree/estree/blob/master/es2015.md#programs
 */
export type Program = {
  type: NodeType.Program;
  body: (
    | Statement
    /*
     * ES2015: Replaces ES5 "Directive" node type.
     */
    | ImportOrExportDeclaration
  )[];
  /*
   * ES2015
   */
  sourceType: 'script' | 'module';
};

export const Program = (
  body: (Statement | ImportOrExportDeclaration)[],
  sourceType: 'script' | 'module',
) => Node(NodeType.Program, { body, sourceType });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#functions
 * @see https://github.com/estree/estree/blob/master/es2015.md#functions
 * @see https://github.com/estree/estree/blob/master/es2017.md#function
 */
export type Function = {
  id: Identifier | null;
  params: Pattern[];
  body: FunctionBody;
  /**
   * ES2015
   */
  generator: boolean;
  /**
   * ES2017
   */
  async: boolean;
};

export const Function = (
  id: Identifier | null,
  params: Pattern[],
  body: FunctionBody,
  generator: boolean,
  async: boolean,
): Function => ({ id, params, body, generator, async });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#statements
 */
export type Statement =
  | ExpressionStatement
  | BlockStatement
  | EmptyStatement
  | DebuggerStatement
  | WithStatement
  | ReturnStatement
  | LabeledStatement
  | BreakStatement
  | ContinueStatement
  | IfStatement
  | SwitchStatement
  | ThrowStatement
  | TryStatement
  | WhileStatement
  | DoWhileStatement
  | ForStatement
  | ForInStatement
  | Declaration;

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#expressionstatement
 */
export type ExpressionStatement = {
  type: NodeType.ExpressionStatement;
  expression: Expression;
};

export const ExpressionStatement = (expression: Expression) =>
  Node(NodeType.ExpressionStatement, { expression });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#directive
 */
export type Directive = {
  type: NodeType.ExpressionStatement;
  expression: Literal;
  directive: string;
};

export const Directive = (
  expression: Literal,
  directive: string,
): Directive => ({
  type: NodeType.ExpressionStatement,
  expression,
  directive,
});

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#blockstatement
 */
export type BlockStatement = {
  type: NodeType.BlockStatement;
  body: Statement[];
};

export const BlockStatement = (body: Statement[]) =>
  Node(NodeType.BlockStatement, { body });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#functionbody
 */
export type FunctionBody = {
  body: (Directive | Statement)[];
};

export const FunctionBody = (body: (Directive | Statement)[]) =>
  Node(NodeType.BlockStatement, { body });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#emptystatement
 */
export type EmptyStatement = {
  type: NodeType.EmptyStatement;
};

export const EmptyStatement = () => Node(NodeType.EmptyStatement, {});

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#debuggerstatement
 */
export type DebuggerStatement = {
  type: NodeType.DebuggerStatement;
};

export const DebuggerStatement = () => Node(NodeType.DebuggerStatement, {});

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#withstatement
 */
export type WithStatement = {
  type: NodeType.WithStatement;
  object: Expression;
  body: Statement;
};

export const WithStatement = (object: Expression, body: Statement) =>
  Node(NodeType.WithStatement, { object, body });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#returnstatement
 */
export type ReturnStatement = {
  type: NodeType.ReturnStatement;
  argument: Expression | null;
};

export const ReturnStatement = (argument: Expression | null) =>
  Node(NodeType.ReturnStatement, { argument });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#labeledstatement
 */
export type LabeledStatement = {
  type: NodeType.LabeledStatement;
  label: Identifier;
  body: Statement;
};

export const LabeledStatement = (label: Identifier, body: Statement) =>
  Node(NodeType.LabeledStatement, { label, body });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#breakstatement
 */
export type BreakStatement = {
  type: NodeType.BreakStatement;
  label: Identifier | null;
};

export const BreakStatement = (label: Identifier | null) =>
  Node(NodeType.BreakStatement, { label });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#continuestatement
 */
export type ContinueStatement = {
  type: NodeType.ContinueStatement;
  label: Identifier | null;
};

export const ContinueStatement = (label: Identifier | null) =>
  Node(NodeType.ContinueStatement, { label });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#ifstatement
 */
export type IfStatement = {
  type: NodeType.IfStatement;
  test: Expression;
  consequent: Statement;
  alternate: Statement | null;
};

export const IfStatement = (
  test: Expression,
  consequent: Statement,
  alternate: Statement | null,
) => Node(NodeType.IfStatement, { test, consequent, alternate });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#switchstatement
 */
export type SwitchStatement = {
  type: NodeType.SwitchStatement;
  discriminant: Expression;
  cases: SwitchCase[];
};

export const SwitchStatement = (
  discriminant: Expression,
  cases: SwitchCase[],
) => Node(NodeType.SwitchStatement, { discriminant, cases });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#switchcase
 */
export type SwitchCase = {
  type: NodeType.SwitchCase;
  test: Expression | null;
  consequent: Statement[];
};

export const SwitchCase = (test: Expression | null, consequent: Statement[]) =>
  Node(NodeType.SwitchCase, { test, consequent });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#throwstatement
 */
export type ThrowStatement = {
  type: NodeType.ThrowStatement;
  argument: Expression;
};

export const ThrowStatement = (argument: Expression) =>
  Node(NodeType.ThrowStatement, { argument });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#trystatement
 */
export type TryStatement = {
  type: NodeType.TryStatement;
  block: BlockStatement;
  handler: CatchClause | null;
  finalizer: BlockStatement | null;
};

export const TryStatement = (
  block: BlockStatement,
  handler: CatchClause | null,
  finalizer: BlockStatement | null,
) => Node(NodeType.TryStatement, { block, handler, finalizer });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#catchclause
 * @see https://github.com/estree/estree/blob/master/es2019.md#catchclause
 */
export type CatchClause = {
  type: NodeType.CatchClause;
  /*
   * ES2019: Adds `null` node type.
   */
  param: Pattern | null;
  body: BlockStatement;
};

export const CatchClause = (param: Pattern | null, body: BlockStatement) =>
  Node(NodeType.CatchClause, { param, body });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#whilestatement
 */
export type WhileStatement = {
  type: NodeType.WhileStatement;
  test: Expression;
  body: Statement;
};

export const WhileStatement = (test: Expression, body: Statement) =>
  Node(NodeType.WhileStatement, { test, body });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#dowhilestatement
 */
export type DoWhileStatement = {
  type: NodeType.DoWhileStatement;
  body: Statement;
  test: Expression;
};

export const DoWhileStatement = (body: Statement, test: Expression) =>
  Node(NodeType.DoWhileStatement, { body, test });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#forstatement
 */
export type ForStatement = {
  type: NodeType.ForStatement;
  init: VariableDeclaration | Expression | null;
  test: Expression | null;
  update: Expression | null;
  body: Statement;
};

export const ForStatement = (
  init: VariableDeclaration | Expression | null,
  test: Expression | null,
  update: Expression | null,
  body: Statement,
) => Node(NodeType.ForStatement, { init, test, update, body });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#forinstatement
 */
export type ForInStatement = {
  type: NodeType.ForInStatement;
  left: VariableDeclaration | Pattern;
  right: Expression;
  body: Statement;
};

export const ForInStatement = (
  left: VariableDeclaration | Pattern,
  right: Expression,
  body: Statement,
) => Node(NodeType.ForInStatement, { left, right, body });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#declarations
 */
export type Declaration =
  | FunctionDeclaration
  | VariableDeclaration
  | ClassDeclaration;

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#functiondeclaration
 */
export type FunctionDeclaration = Function & {
  type: NodeType.FunctionDeclaration;
  id: Identifier;
};

export const FunctionDeclaration = (
  id: Identifier,
  params: Pattern[],
  body: FunctionBody,
  generator: boolean,
  async: boolean,
): FunctionDeclaration => ({
  type: NodeType.FunctionDeclaration,
  id,
  params,
  body,
  generator,
  async,
});

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#variabledeclaration
 * @see https://github.com/estree/estree/blob/master/es2015.md#variabledeclaration
 */
export type VariableDeclaration = {
  type: NodeType.VariableDeclaration;
  declarations: VariableDeclarator[];
  kind:
    | 'var'
    /*
     * ES2015
     */
    | 'let'
    | 'const';
};

export const VariableDeclaration = (
  declarations: VariableDeclarator[],
  kind: 'var' | 'let' | 'const',
) => Node(NodeType.VariableDeclaration, { declarations, kind });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#variabledeclarator
 */
export type VariableDeclarator = {
  type: NodeType.VariableDeclarator;
  id: Pattern;
  init: Expression | null;
};

export const VariableDeclarator = (id: Pattern, init: Expression | null) =>
  Node(NodeType.VariableDeclarator, { id, init });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#expressions
 */
export type Expression =
  | Identifier
  | Literal
  | ThisExpression
  | ArrayExpression
  | ObjectExpression
  | FunctionExpression
  | UnaryExpression
  | UpdateExpression
  | BinaryExpression
  | AssignmentExpression
  | LogicalExpression
  | MemberExpression
  | ConditionalExpression
  | CallExpression
  | NewExpression
  | SequenceExpression
  | ArrowFunctionExpression
  | YieldExpression
  | TemplateLiteral
  | TaggedTemplateExpression
  | ClassExpression
  | MetaProperty
  | AwaitExpression
  | Literal
  | ChainExpression
  | ImportExpression
  | BinaryExpression;

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#thisexpression
 */
export type ThisExpression = {
  type: NodeType.ThisExpression;
};

export const ThisExpression = () => Node(NodeType.ThisExpression, {});

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#arrayexpression
 * @see https://github.com/estree/estree/blob/master/es2015.md#expressions
 */
export type ArrayExpression = {
  type: NodeType.ArrayExpression;
  elements: (
    | Expression
    | null
    /*
     * ES2015
     */
    | SpreadElement
  )[];
};

export const ArrayExpression = (
  elements: (Expression | null | SpreadElement)[],
) => Node(NodeType.ArrayExpression, { elements });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#objectexpression
 * @see https://github.com/estree/estree/blob/master/es2018.md#expressions
 */
export type ObjectExpression = {
  type: NodeType.ObjectExpression;
  properties: (
    | Property
    /*
     * ES2018
     */
    | SpreadElement
  )[];
};

export const ObjectExpression = (properties: (Property | SpreadElement)[]) =>
  Node(NodeType.ObjectExpression, { properties });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#property
 * @see https://github.com/estree/estree/blob/master/es2015.md#expressions
 */
export type Property = {
  type: NodeType.Property;
  key: Literal | Identifier;
  value: Expression;
  kind: 'init' | 'get' | 'set';
  /*
   * ES2015
   */
  method: boolean;
  shorthand: boolean;
  computed: boolean;
};

export const Property = (
  key: Literal | Identifier,
  value: Expression,
  kind: 'init' | 'get' | 'set',
  method: boolean,
  shorthand: boolean,
  computed: boolean,
) => Node(NodeType.Property, { key, value, kind, method, shorthand, computed });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#functionexpression
 */
export type FunctionExpression = Function & {
  type: NodeType.FunctionExpression;
};

export const FunctionExpression = (
  id: Identifier | null,
  params: Pattern[],
  body: FunctionBody,
  generator: boolean,
  async: boolean,
): FunctionExpression => ({
  type: NodeType.FunctionExpression,
  id,
  params,
  body,
  generator,
  async,
});

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#unaryexpression
 */
export type UnaryExpression = {
  type: NodeType.UnaryExpression;
  operator: UnaryOperator;
  prefix: boolean;
  argument: Expression;
};

export const UnaryExpression = (
  operator: UnaryOperator,
  prefix: boolean,
  argument: Expression,
) => Node(NodeType.UnaryExpression, { operator, prefix, argument });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#unaryoperator
 */
export type UnaryOperator =
  | '-'
  | '+'
  | '!'
  | '~'
  | 'typeof'
  | 'void'
  | 'delete';

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#updateexpression
 */
export type UpdateExpression = {
  type: NodeType.UpdateExpression;
  operator: UpdateOperator;
  argument: Expression;
  prefix: boolean;
};

export const UpdateExpression = (
  operator: UpdateOperator,
  argument: Expression,
  prefix: boolean,
) => Node(NodeType.UpdateExpression, { operator, argument, prefix });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#updateoperator
 */
export type UpdateOperator = '++' | '--';

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#binaryexpression
 * @see https://github.com/estree/estree/blob/master/es2022.md#binaryexpression
 */
export type BinaryExpression = {
  type: NodeType.BinaryExpression;
  operator: BinaryOperator;
  left:
    | Expression
    /*
     * ES2022
     */
    | PrivateIdentifier;
  right: Expression;
};

export const BinaryExpression = (
  operator: BinaryOperator,
  left: Expression | PrivateIdentifier,
  right: Expression,
) => Node(NodeType.BinaryExpression, { operator, left, right });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#binaryoperator
 * @see https://github.com/estree/estree/blob/master/es2016.md#binaryoperator
 */
export type BinaryOperator =
  /*
   * ES5
   */
  | '=='
  | '!='
  | '==='
  | '!=='
  | '<'
  | '<='
  | '>'
  | '>='
  | '<<'
  | '>>'
  | '>>>'
  | '+'
  | '-'
  | '*'
  | '/'
  | '%'
  | '|'
  | '^'
  | '&'
  | 'in'
  | 'instanceof'
  /*
   * ES2016
   */
  | '**';

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#assignmentexpression
 * @see https://github.com/estree/estree/blob/master/es2015.md#expressions
 */
export type AssignmentExpression = {
  type: NodeType.AssignmentExpression;
  operator: AssignmentOperator;
  /*
   * ES2015: Removes ES5 "Expression" node type.
   */
  left: Pattern;
  right: Expression;
};

export const AssignmentExpression = (
  operator: AssignmentOperator,
  left: Pattern,
  right: Expression,
) => Node(NodeType.AssignmentExpression, { operator, left, right });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#assignmentoperator
 * @see https://github.com/estree/estree/blob/master/es2016.md#assignmentoperator
 * @see https://github.com/estree/estree/blob/master/es2021.md#assignmentoperator
 */
export type AssignmentOperator =
  | '='
  | '+='
  | '-='
  | '*='
  | '/='
  | '%='
  | '<<='
  | '>>='
  | '>>>='
  | '|='
  | '^='
  | '&='
  /*
   * ES2016
   */
  | '**='
  /*
   * ES2021
   */
  | '||='
  | '&&='
  | '??=';

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#logicalexpression
 */
export type LogicalExpression = {
  type: NodeType.LogicalExpression;
  operator: LogicalOperator;
  left: Expression;
  right: Expression;
};

export const LogicalExpression = (
  operator: LogicalOperator,
  left: Expression,
  right: Expression,
) => Node(NodeType.LogicalExpression, { operator, left, right });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#logicaloperator
 * @see https://github.com/estree/estree/blob/master/es2020.md#logicalexpression
 */
export type LogicalOperator =
  | '||'
  | '&&'
  /*
   * ES2020
   */
  | '??';

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#memberexpression
 * @see https://github.com/estree/estree/blob/master/es2015.md#expressions
 * @see https://github.com/estree/estree/blob/master/es2020.md#chainexpression
 * @see https://github.com/estree/estree/blob/master/es2022.md#privateidentifier
 */
export type MemberExpression = {
  type: NodeType.MemberExpression;
  object:
    | Expression
    /*
     * ES2015
     */
    | Super;
  property:
    | Expression
    /*
     * ES2022
     */
    | PrivateIdentifier;
  computed: boolean;
  /*
   * ES2020
   */
} & ChainElement;

export const MemberExpression = (
  object: Expression | Super,
  property: Expression | PrivateIdentifier,
  computed: boolean,
  optional: boolean,
) => Node(NodeType.MemberExpression, { object, property, computed, optional });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#conditionalexpression
 */
export type ConditionalExpression = {
  type: NodeType.ConditionalExpression;
  test: Expression;
  alternate: Expression;
  consequent: Expression;
};

export const ConditionalExpression = (
  test: Expression,
  alternate: Expression,
  consequent: Expression,
) => Node(NodeType.ConditionalExpression, { test, alternate, consequent });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#callexpression
 * @see https://github.com/estree/estree/blob/master/es2015.md#expressions
 * @see https://github.com/estree/estree/blob/master/es2020.md#chainexpression
 */
export type CallExpression = {
  type: NodeType.CallExpression;
  callee:
    | Expression
    /*
     * ES2015
     */
    | Super;
  arguments: (
    | Expression
    /*
     * ES2015
     */
    | SpreadElement
  )[];
  /*
   * ES2020
   */
} & ChainElement;

export const CallExpression = (
  callee: Expression | Super,
  arguments_: (Expression | SpreadElement)[],
  optional: boolean,
) => Node(NodeType.CallExpression, { callee, arguments: arguments_, optional });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#newexpression
 * @see https://github.com/estree/estree/blob/master/es2015.md#expressions
 */
export type NewExpression = {
  type: NodeType.NewExpression;
  callee: Expression;
  arguments: (
    | Expression
    /*
     * ES2015
     */
    | SpreadElement
  )[];
};

export const NewExpression = (
  callee: Expression,
  arguments_: (Expression | SpreadElement)[],
) => Node(NodeType.NewExpression, { callee, arguments: arguments_ });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#sequenceexpression
 */
export type SequenceExpression = {
  type: NodeType.SequenceExpression;
  expressions: Expression[];
};

export const SequenceExpression = (expressions: Expression[]) =>
  Node(NodeType.SequenceExpression, { expressions });

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#patterns
 */
export type Pattern =
  | Identifier
  | ObjectPattern
  | ArrayPattern
  | RestElement
  | AssignmentPattern
  | MemberExpression;

/*
 * ES2015
 * -------------------------------------------------------------------------------------------------
 */

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#forofstatement
 * @see https://github.com/estree/estree/blob/master/es2018.md#statements
 */
export type ForOfStatement = Omit<ForInStatement, 'type'> & {
  type: NodeType.ForOfStatement;
  /*
   * ES2018
   */
  await: boolean;
};

export const ForOfStatement = (
  left: VariableDeclaration | Pattern,
  right: Expression,
  body: Statement,
  await_: boolean,
): ForOfStatement => ({
  ...ForInStatement(left, right, body),
  type: NodeType.ForOfStatement,
  await: await_,
});

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#expressions
 */
export type Super = {
  type: NodeType.Super;
};

export const Super = () => Node(NodeType.Super, {});

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#expressions
 */
export type SpreadElement = {
  type: NodeType.SpreadElement;
  argument: Expression;
};

export const SpreadElement = (argument: Expression) =>
  Node(NodeType.SpreadElement, { argument });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#expressions
 */
export type ArrowFunctionExpression = Omit<Function, 'body'> & {
  type: NodeType.ArrowFunctionExpression;
  body: FunctionBody | Expression;
  expression: boolean;
  generator: false;
};

export const ArrowFunctionExpression = (
  id: Identifier | null,
  params: Pattern[],
  body: FunctionBody,
  expression: boolean,
  async: boolean,
) =>
  Node(NodeType.ArrowFunctionExpression, {
    id,
    params,
    body,
    expression,
    generator: false,
    async,
  });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#yieldexpression
 */
export type YieldExpression = {
  type: NodeType.YieldExpression;
  argument: Expression | null;
  delegate: boolean;
};

export const YieldExpression = (
  argument: Expression | null,
  delegate: boolean,
) => Node(NodeType.YieldExpression, { argument, delegate });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#templateliteral
 */
export type TemplateLiteral = {
  type: NodeType.TemplateLiteral;
  quasis: TemplateElement[];
  expressions: Expression[];
};

export const TemplateLiteral = (
  quasis: TemplateElement[],
  expressions: Expression[],
) => Node(NodeType.TemplateLiteral, { quasis, expressions });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#taggedtemplateexpression
 */
export type TaggedTemplateExpression = {
  type: NodeType.TaggedTemplateExpression;
  tag: Expression;
  quasi: TemplateLiteral;
};

export const TaggedTemplateExpression = (
  tag: Expression,
  quasi: TemplateLiteral,
) => Node(NodeType.TaggedTemplateExpression, { tag, quasi });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#templateelement
 * @see https://github.com/estree/estree/blob/master/es2018.md#template-literals
 */
export type TemplateElement = {
  type: NodeType.TemplateElement;
  tail: boolean;
  value: {
    cooked:
      | string
      /*
       * ES2018
       */
      | null;
    raw: string;
  };
};

export const TemplateElement = (
  tail: boolean,
  value: { cooked: string | null; raw: string },
) => Node(NodeType.TemplateElement, { tail, value });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#objectpattern
 */
export type AssignmentProperty = Omit<Property, 'value' | 'kind' | 'method'> & {
  value: Pattern;
  kind: 'init';
  method: false;
};

export const AssignmentProperty = (
  key: Literal | Identifier,
  value: Pattern,
  shorthand: boolean,
  computed: boolean,
): AssignmentProperty => ({
  type: NodeType.Property,
  key,
  value,
  kind: 'init',
  method: false,
  shorthand,
  computed,
});

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#objectpattern
 * @see https://github.com/estree/estree/blob/master/es2018.md#patterns
 */
export type ObjectPattern = {
  type: NodeType.ObjectPattern;
  properties: (
    | AssignmentProperty
    /*
     * ES2018
     */
    | RestElement
  )[];
};

export const ObjectPattern = (
  properties: (AssignmentProperty | RestElement)[],
): ObjectPattern => Node(NodeType.ObjectPattern, { properties });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#arraypattern
 */
export type ArrayPattern = {
  type: NodeType.ArrayPattern;
  elements: (Pattern | null)[];
};

export const ArrayPattern = (elements: (Pattern | null)[]) =>
  Node(NodeType.ArrayPattern, { elements });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#restelement
 */
export type RestElement = {
  type: NodeType.RestElement;
  argument: Pattern;
};

export const RestElement = (argument: Pattern) =>
  Node(NodeType.RestElement, { argument });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#assignmentpattern
 */
export type AssignmentPattern = {
  type: NodeType.AssignmentPattern;
  left: Pattern;
  right: Expression;
};

export const AssignmentPattern = (left: Pattern, right: Expression) =>
  Node(NodeType.AssignmentPattern, { left, right });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#classes
 */
export type Class = {
  id: Identifier | null;
  superClass: Expression | null;
  body: ClassBody;
};

export const Class = (
  id: Identifier | null,
  superClass: Expression | null,
  body: ClassBody,
): Class => ({ id, superClass, body });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#classbody
 * @see https://github.com/estree/estree/blob/master/es2022.md#classbody
 */
export type ClassBody = {
  type: NodeType.ClassBody;
  body: (
    | MethodDefinition
    /*
     * ES2022
     */
    | PropertyDefinition
    | StaticBlock
  )[];
};

export const ClassBody = (
  body: (MethodDefinition | PropertyDefinition | StaticBlock)[],
) => Node(NodeType.ClassBody, { body });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#methoddefinition
 * @see https://github.com/estree/estree/blob/master/es2022.md#methoddefinition
 */
export type MethodDefinition = {
  type: NodeType.MethodDefinition;
  key:
    | Expression
    /*
     * ES2022
     */
    | PrivateIdentifier;
  value: FunctionExpression;
  kind: 'constructor' | 'method' | 'get' | 'set';
  computed: boolean;
  static: boolean;
};

export const MethodDefinition = (
  key: Expression | PrivateIdentifier,
  value: FunctionExpression,
  kind: 'constructor' | 'method' | 'get' | 'set',
  computed: boolean,
  static_: boolean,
) =>
  Node(NodeType.MethodDefinition, {
    key,
    value,
    kind,
    computed,
    static: static_,
  });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#classdeclaration
 */
export type ClassDeclaration = Class & {
  type: NodeType.ClassDeclaration;
  id: Identifier;
};

export const ClassDeclaration = (
  id: Identifier,
  superClass: Expression | null,
  body: ClassBody,
) => Node(NodeType.ClassDeclaration, { id, superClass, body });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#classexpression
 */
export type ClassExpression = Class & {
  type: NodeType.ClassExpression;
};

export const ClassExpression = (
  id: Identifier | null,
  superClass: Expression | null,
  body: ClassBody,
) => Node(NodeType.ClassExpression, { id, superClass, body });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#metaproperty
 */
export type MetaProperty = {
  type: NodeType.MetaProperty;
  meta: Identifier;
  property: Identifier;
};

export const MetaProperty = (meta: Identifier, property: Identifier) =>
  Node(NodeType.MetaProperty, { meta, property });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#importorexportdeclaration
 */
export type ImportOrExportDeclaration =
  | ImportDeclaration
  | ExportNamedDeclaration
  | ExportDefaultDeclaration
  | ExportAllDeclaration;

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#modulespecifier
 */
export type ModuleSpecifier = {
  local: Identifier;
};

export const ModuleSpecifier = (local: Identifier): ModuleSpecifier => ({
  local,
});

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#importdeclaration
 */
export type ImportDeclaration = {
  type: NodeType.ImportDeclaration;
  specifiers: (
    | ImportSpecifier
    | ImportDefaultSpecifier
    | ImportNamespaceSpecifier
  )[];
  source: Literal;
};

export const ImportDeclaration = (
  specifiers: (
    | ImportSpecifier
    | ImportDefaultSpecifier
    | ImportNamespaceSpecifier
  )[],
  source: Literal,
) => Node(NodeType.ImportDeclaration, { specifiers, source });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#importspecifier
 * @see https://github.com/estree/estree/blob/master/es2022.md#importspecifier
 */
export type ImportSpecifier = ModuleSpecifier & {
  type: NodeType.ImportSpecifier;
  imported:
    | Identifier
    /*
     * ES2022
     */
    | Literal;
};

export const ImportSpecifier = (
  local: Identifier,
  imported: Identifier | Literal,
) => Node(NodeType.ImportSpecifier, { local, imported });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#importdefaultspecifier
 */
export type ImportDefaultSpecifier = ModuleSpecifier & {
  type: NodeType.ImportDefaultSpecifier;
};

export const ImportDefaultSpecifier = (local: Identifier) =>
  Node(NodeType.ImportDefaultSpecifier, { local });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#importnamespacespecifier
 */
export type ImportNamespaceSpecifier = ModuleSpecifier & {
  type: NodeType.ImportNamespaceSpecifier;
};

export const ImportNamespaceSpecifier = (local: Identifier) =>
  Node(NodeType.ImportNamespaceSpecifier, { local });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#exportnameddeclaration
 */
export type ExportNamedDeclaration = {
  type: NodeType.ExportNamedDeclaration;
  declaration: Declaration | null;
  specifiers: ExportSpecifier[];
  source: Literal | null;
};

export const ExportNamedDeclaration = (
  declaration: Declaration | null,
  specifiers: ExportSpecifier[],
  source: Literal | null,
) => Node(NodeType.ExportNamedDeclaration, { declaration, specifiers, source });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#exportspecifier
 * @see https://github.com/estree/estree/blob/master/es2022.md#exportspecifier
 */
export type ExportSpecifier = Omit<ModuleSpecifier, 'local'> & {
  type: NodeType.ExportSpecifier;
  local: Identifier | Literal;
  exported: Identifier | Literal;
};

export const ExportSpecifier = (
  local: Identifier | Literal,
  exported: Identifier | Literal,
) => Node(NodeType.ExportSpecifier, { local, exported });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#exportdefaultdeclaration
 */
export type AnonymousDefaultExportedFunctionDeclaration = Omit<
  Function,
  'id'
> & {
  type: NodeType.FunctionDeclaration;
  id: null;
};

export const AnonymousDefaultExportedFunctionDeclaration = (
  params: Pattern[],
  body: BlockStatement,
  generator: boolean,
  async: boolean,
): AnonymousDefaultExportedFunctionDeclaration => ({
  type: NodeType.FunctionDeclaration,
  id: null,
  params,
  body,
  generator,
  async,
});

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#exportdefaultdeclaration
 */
export type AnonymousDefaultExportedClassDeclaration = Class & {
  type: NodeType.ClassDeclaration;
  id: null;
};

export const AnonymousDefaultExportedClassDeclaration = (
  superClass: Expression | null,
  body: ClassBody,
): AnonymousDefaultExportedClassDeclaration => ({
  type: NodeType.ClassDeclaration,
  id: null,
  superClass,
  body,
});

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#exportdefaultdeclaration
 */
export type ExportDefaultDeclaration = {
  type: NodeType.ExportDefaultDeclaration;
  declaration:
    | AnonymousDefaultExportedFunctionDeclaration
    | FunctionDeclaration
    | AnonymousDefaultExportedClassDeclaration
    | ClassDeclaration
    | Expression;
};

export const ExportDefaultDeclaration = (
  declaration:
    | AnonymousDefaultExportedFunctionDeclaration
    | FunctionDeclaration
    | AnonymousDefaultExportedClassDeclaration
    | ClassDeclaration
    | Expression,
) => Node(NodeType.ExportDefaultDeclaration, { declaration });

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#exportalldeclaration
 * @see https://github.com/estree/estree/blob/master/es2020.md#exportalldeclaration
 * @see https://github.com/estree/estree/blob/master/es2022.md#exportalldeclaration
 */
export type ExportAllDeclaration = {
  type: NodeType.ExportAllDeclaration;
  source: Literal;
  /*
   * ES2020
   */
  exported:
    | Identifier
    | null
    /*
     * ES2022
     */
    | Literal;
};

export const ExportAllDeclaration = (
  source: Literal,
  exported: Identifier | null | Literal,
) => Node(NodeType.ExportAllDeclaration, { source, exported });

/*
 * ES2017
 * -------------------------------------------------------------------------------------------------
 */

/**
 * @see https://github.com/estree/estree/blob/master/es2017.md#awaitexpression
 */
export type AwaitExpression = {
  type: NodeType.AwaitExpression;
  argument: Expression;
};

export const AwaitExpression = (argument: Expression) =>
  Node(NodeType.AwaitExpression, { argument });

/*
 * ES2020
 * -------------------------------------------------------------------------------------------------
 */

/**
 * @see https://github.com/estree/estree/blob/master/es2020.md#chainexpression
 */
export type ChainExpression = {
  type: NodeType.ChainExpression;
  expression: ChainElement;
};

export const ChainExpression = (expression: ChainElement) =>
  Node(NodeType.ChainExpression, { expression });

/**
 * @see https://github.com/estree/estree/blob/master/es2020.md#chainexpression
 */
export type ChainElement = {
  optional: boolean;
};

export const ChainElement = (optional: boolean) => ({ optional });

/**
 * @see https://github.com/estree/estree/blob/master/es2020.md#chainexpression
 */
export type ImportExpression = {
  type: NodeType.ImportExpression;
  source: Expression;
};

export const ImportExpression = (source: Expression) =>
  Node(NodeType.ImportExpression, { source });

/*
 * ES2022
 * -------------------------------------------------------------------------------------------------
 */

/**
 * @see https://github.com/estree/estree/blob/master/es2022.md#propertydefinition
 */
export type PropertyDefinition = {
  type: NodeType.PropertyDefinition;
  key: Expression | PrivateIdentifier;
  value: Expression | null;
  computed: boolean;
  static: boolean;
};

export const PropertyDefinition = (
  key: Expression | PrivateIdentifier,
  value: Expression | null,
  computed: boolean,
  static_: boolean,
) =>
  Node(NodeType.PropertyDefinition, { key, value, computed, static: static_ });

/**
 * @see https://github.com/estree/estree/blob/master/es2022.md#privateidentifier
 */
export type PrivateIdentifier = {
  type: NodeType.PrivateIdentifier;
  name: string;
};

export const PrivateIdentifier = (name: string) =>
  Node(NodeType.PrivateIdentifier, { name });

/**
 * @see https://github.com/estree/estree/blob/master/es2022.md#staticblock
 */
export type StaticBlock = Omit<BlockStatement, 'type'> & {
  type: NodeType.StaticBlock;
};

export const StaticBlock = (body: Statement[]) =>
  Node(NodeType.StaticBlock, { body });
