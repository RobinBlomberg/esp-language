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

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#identifier
 */
export type Identifier = {
  type: NodeType.Identifier;
  name: string;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#directive
 */
export type Directive = {
  type: NodeType.ExpressionStatement;
  expression: Literal;
  directive: string;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#blockstatement
 */
export type BlockStatement = {
  type: NodeType.BlockStatement;
  body: Statement[];
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#functionbody
 */
export type FunctionBody = {
  body: (Directive | Statement)[];
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#emptystatement
 */
export type EmptyStatement = {
  type: NodeType.EmptyStatement;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#debuggerstatement
 */
export type DebuggerStatement = {
  type: NodeType.DebuggerStatement;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#withstatement
 */
export type WithStatement = {
  type: NodeType.WithStatement;
  object: Expression;
  body: Statement;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#returnstatement
 */
export type ReturnStatement = {
  type: NodeType.ReturnStatement;
  argument: Expression | null;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#labeledstatement
 */
export type LabeledStatement = {
  type: NodeType.LabeledStatement;
  label: Identifier;
  body: Statement;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#breakstatement
 */
export type BreakStatement = {
  type: NodeType.BreakStatement;
  label: Identifier | null;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#continuestatement
 */
export type ContinueStatement = {
  type: NodeType.ContinueStatement;
  label: Identifier | null;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#ifstatement
 */
export type IfStatement = {
  type: NodeType.IfStatement;
  test: Expression;
  consequent: Statement;
  alternate: Statement | null;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#switchstatement
 */
export type SwitchStatement = {
  type: NodeType.SwitchStatement;
  discriminant: Expression;
  cases: SwitchCase[];
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#switchcase
 */
export type SwitchCase = {
  type: NodeType.SwitchCase;
  test: Expression | null;
  consequent: Statement[];
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#throwstatement
 */
export type ThrowStatement = {
  type: NodeType.ThrowStatement;
  argument: Expression;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#trystatement
 */
export type TryStatement = {
  type: NodeType.TryStatement;
  block: BlockStatement;
  handler: CatchClause | null;
  finalizer: BlockStatement | null;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#whilestatement
 */
export type WhileStatement = {
  type: NodeType.WhileStatement;
  test: Expression;
  body: Statement;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#dowhilestatement
 */
export type DoWhileStatement = {
  type: NodeType.DoWhileStatement;
  body: Statement;
  test: Expression;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#forinstatement
 */
export type ForInStatement = {
  type: NodeType.ForInStatement;
  left: VariableDeclaration | Pattern;
  right: Expression;
  body: Statement;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#variabledeclarator
 */
export type VariableDeclarator = {
  type: NodeType.VariableDeclarator;
  id: Pattern;
  init: Expression | null;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#functionexpression
 */
export type FunctionExpression = Function & {
  type: NodeType.FunctionExpression;
};

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#unaryexpression
 */
export type UnaryExpression = {
  type: NodeType.UnaryExpression;
  operator: UnaryOperator;
  prefix: boolean;
  argument: Expression;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#conditionalexpression
 */
export type ConditionalExpression = {
  type: NodeType.ConditionalExpression;
  test: Expression;
  alternate: Expression;
  consequent: Expression;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es5.md#sequenceexpression
 */
export type SequenceExpression = {
  type: NodeType.SequenceExpression;
  expressions: Expression[];
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#expressions
 */
export type Super = {
  type: NodeType.Super;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#expressions
 */
export type SpreadElement = {
  type: NodeType.SpreadElement;
  argument: Expression;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#expressions
 */
export type ArrowFunctionExpression = Function & {
  type: NodeType.ArrowFunctionExpression;
  body: FunctionBody | Expression;
  expression: boolean;
  generator: false;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#yieldexpression
 */
export type YieldExpression = {
  type: NodeType.YieldExpression;
  argument: Expression | null;
  delegate: boolean;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#templateliteral
 */
export type TemplateLiteral = {
  type: NodeType.TemplateLiteral;
  quasis: TemplateElement[];
  expressions: Expression[];
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#taggedtemplateexpression
 */
export type TaggedTemplateExpression = {
  type: NodeType.TaggedTemplateExpression;
  tag: Expression;
  quasi: TemplateLiteral;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#objectpattern
 */
export type AssignmentProperty = {
  type: NodeType.Property;
  value: Pattern;
  kind: 'init';
  method: false;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#arraypattern
 */
export type ArrayPattern = {
  type: NodeType.ArrayPattern;
  elements: (Pattern | null)[];
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#restelement
 */
export type RestElement = {
  type: NodeType.RestElement;
  argument: Pattern;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#assignmentpattern
 */
export type AssignmentPattern = {
  type: NodeType.AssignmentPattern;
  left: Pattern;
  right: Expression;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#classes
 */
export type Class = {
  id: Identifier | null;
  superClass: Expression | null;
  body: ClassBody;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#classdeclaration
 */
export type ClassDeclaration = Class & {
  type: NodeType.ClassDeclaration;
  id: Identifier;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#classexpression
 */
export type ClassExpression = Class & {
  type: NodeType.ClassExpression;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#metaproperty
 */
export type MetaProperty = {
  type: NodeType.MetaProperty;
  meta: Identifier;
  property: Identifier;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#importdefaultspecifier
 */
export type ImportDefaultSpecifier = ModuleSpecifier & {
  type: NodeType.ImportDefaultSpecifier;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#importnamespacespecifier
 */
export type ImportNamespaceSpecifier = ModuleSpecifier & {
  type: NodeType.ImportNamespaceSpecifier;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#exportnameddeclaration
 */
export type ExportNamedDeclaration = {
  type: NodeType.ExportNamedDeclaration;
  declaration: Declaration | null;
  specifiers: ExportSpecifier[];
  source: Literal | null;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#exportspecifier
 * @see https://github.com/estree/estree/blob/master/es2022.md#exportspecifier
 */
export type ExportSpecifier = Omit<ModuleSpecifier, 'local'> & {
  type: NodeType.ExportSpecifier;
  local: Identifier | Literal;
  exported: Identifier | Literal;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#exportdefaultdeclaration
 */
export type AnonymousDefaultExportedFunctionDeclaration = Function & {
  type: NodeType.FunctionDeclaration;
  id: null;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2015.md#exportdefaultdeclaration
 */
export type AnonymousDefaultExportedClassDeclaration = Class & {
  type: NodeType.ClassDeclaration;
  id: null;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es2020.md#chainexpression
 */
export type ChainElement = {
  optional: boolean;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2020.md#chainexpression
 */
export type ImportExpression = {
  type: NodeType.ImportExpression;
  source: Expression;
};

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

/**
 * @see https://github.com/estree/estree/blob/master/es2022.md#privateidentifier
 */
export type PrivateIdentifier = {
  type: NodeType.PrivateIdentifier;
  name: string;
};

/**
 * @see https://github.com/estree/estree/blob/master/es2022.md#staticblock
 */
export type StaticBlock = Omit<BlockStatement, 'type'> & {
  type: NodeType.StaticBlock;
};
