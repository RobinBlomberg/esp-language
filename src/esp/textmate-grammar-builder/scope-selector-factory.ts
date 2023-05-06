export type ESPScopeSelector =
  | 'case-clause.expr.esp'
  | 'comment.block.documentation.esp'
  | 'comment.block.esp'
  | 'comment.line.double-slash.esp'
  | 'comment.line.shebang.esp'
  | 'comment.line.triple-slash.directive.esp'
  | 'constant.character.entity.esp'
  | 'constant.character.escape.esp'
  | 'constant.language.boolean.false.esp'
  | 'constant.language.boolean.true.esp'
  | 'constant.language.import-export-all.esp'
  | 'constant.language.infinity.esp'
  | 'constant.language.nan.esp'
  | 'constant.language.null.esp'
  | 'constant.language.undefined.esp'
  | 'constant.numeric.binary.esp'
  | 'constant.numeric.decimal.esp'
  | 'constant.numeric.hex.esp'
  | 'constant.numeric.octal.esp'
  | 'entity.name.function.esp'
  | 'entity.name.function.tagged-template.esp'
  | 'entity.name.label.esp'
  | 'entity.name.tag.directive.esp'
  | 'entity.name.tag.esp'
  | 'entity.name.tag.namespace.esp'
  | 'entity.name.type.alias.esp'
  | 'entity.name.type.class.esp'
  | 'entity.name.type.enum.esp'
  | 'entity.name.type.interface.esp'
  | 'entity.name.type.esp'
  | 'entity.name.type.module.esp'
  | 'entity.other.attribute-name.directive.esp'
  | 'entity.other.attribute-name.esp'
  | 'entity.other.attribute-name.namespace.esp'
  | 'entity.other.inherited-class.esp'
  | 'invalid.illegal.attribute.esp'
  | 'invalid.illegal.bad-ampersand.esp'
  | 'invalid.illegal.newline.esp'
  | 'keyword.control.as.esp'
  | 'keyword.control.assert.esp'
  | 'keyword.control.conditional.esp'
  | 'keyword.control.default.esp'
  | 'keyword.control.export.esp'
  | 'keyword.control.flow.esp'
  | 'keyword.control.from.esp'
  | 'keyword.control.import.esp'
  | 'keyword.control.intrinsic.esp'
  | 'keyword.control.esp'
  | 'keyword.control.loop.esp'
  | 'keyword.control.new.esp'
  | 'keyword.control.require.esp'
  | 'keyword.control.switch.esp'
  | 'keyword.control.trycatch.esp'
  | 'keyword.control.type.esp'
  | 'keyword.control.with.esp'
  | 'keyword.generator.asterisk.esp'
  | 'keyword.operator.arithmetic.esp'
  | 'keyword.operator.assignment.compound.bitwise.esp'
  | 'keyword.operator.assignment.compound.esp'
  | 'keyword.operator.assignment.esp'
  | 'keyword.operator.bitwise.esp'
  | 'keyword.operator.bitwise.shift.esp'
  | 'keyword.operator.comparison.esp'
  | 'keyword.operator.decrement.esp'
  | 'keyword.operator.definiteassignment.esp'
  | 'keyword.operator.expression.delete.esp'
  | 'keyword.operator.expression.extends.esp'
  | 'keyword.operator.expression.import.esp'
  | 'keyword.operator.expression.in.esp'
  | 'keyword.operator.expression.infer.esp'
  | 'keyword.operator.expression.instanceof.esp'
  | 'keyword.operator.expression.is.esp'
  | 'keyword.operator.expression.keyof.esp'
  | 'keyword.operator.expression.of.esp'
  | 'keyword.operator.expression.typeof.esp'
  | 'keyword.operator.expression.void.esp'
  | 'keyword.operator.increment.esp'
  | 'keyword.operator.logical.esp'
  | 'keyword.operator.new.esp'
  | 'keyword.operator.optional.esp'
  | 'keyword.operator.relational.esp'
  | 'keyword.operator.rest.esp'
  | 'keyword.operator.spread.esp'
  | 'keyword.operator.ternary.esp'
  | 'keyword.operator.type.annotation.esp'
  | 'keyword.operator.type.asserts.esp'
  | 'keyword.operator.type.esp'
  | 'keyword.operator.type.modifier.esp'
  | 'keyword.other.debugger.esp'
  | 'keyword.other.esp'
  | 'meta.array-binding-pattern-variable.esp'
  | 'meta.array.literal.esp'
  | 'meta.arrow.esp'
  | 'meta.block.esp'
  | 'meta.brace.round.esp'
  | 'meta.brace.square.esp'
  | 'meta.class.esp'
  | 'meta.decorator.esp'
  | 'meta.delimiter.decimal.period.esp'
  | 'meta.enum.declaration.esp'
  | 'meta.export.default.esp'
  | 'meta.export.esp'
  | 'meta.field.declaration.esp'
  | 'meta.function-call.esp'
  | 'meta.function.expression.esp'
  | 'meta.function.esp'
  | 'meta.import-equals.external.esp'
  | 'meta.import-equals.internal.esp'
  | 'meta.import.esp'
  | 'meta.indexer.declaration.esp'
  | 'meta.indexer.mappedtype.declaration.esp'
  | 'meta.interface.esp'
  | 'meta.method.declaration.esp'
  | 'meta.namespace.declaration.esp'
  | 'meta.object-binding-pattern-variable.esp'
  | 'meta.object-literal.key.esp'
  | 'meta.object.member.esp'
  | 'meta.object.type.esp'
  | 'meta.objectliteral.esp'
  | 'meta.parameter.object-binding-pattern.esp'
  | 'meta.parameters.esp'
  | 'meta.paramter.array-binding-pattern.esp'
  | 'meta.return.type.arrow.esp'
  | 'meta.return.type.esp'
  | 'meta.tag.attributes.esp'
  | 'meta.tag.esp'
  | 'meta.tag.without-attributes.esp'
  | 'meta.template.expression.esp'
  | 'meta.type.annotation.esp'
  | 'meta.type.constructor.esp'
  | 'meta.type.declaration.esp'
  | 'meta.type.function.esp'
  | 'meta.type.function.return.esp'
  | 'meta.type.infer.esp'
  | 'meta.type.parameters.esp'
  | 'meta.type.paren.cover.esp'
  | 'meta.type.tuple.esp'
  | 'meta.var-single-variable.expr.esp'
  | 'meta.var.expr.esp'
  | 'new.expr.esp'
  | 'punctuation.accessor.esp'
  | 'punctuation.accessor.optional.esp'
  | 'punctuation.decorator.internaldeclaration.esp'
  | 'punctuation.decorator.esp'
  | 'punctuation.definition.binding-pattern.array.esp'
  | 'punctuation.definition.binding-pattern.object.esp'
  | 'punctuation.definition.block.esp'
  | 'punctuation.definition.comment.esp'
  | 'punctuation.definition.entity.esp'
  | 'punctuation.definition.parameters.begin.esp'
  | 'punctuation.definition.parameters.end.esp'
  | 'punctuation.definition.string.begin.esp'
  | 'punctuation.definition.string.end.esp'
  | 'punctuation.definition.string.template.begin.esp'
  | 'punctuation.definition.string.template.end.esp'
  | 'punctuation.definition.tag.begin.esp'
  | 'punctuation.definition.tag.directive.esp'
  | 'punctuation.definition.tag.end.esp'
  | 'punctuation.definition.template-expression.begin.esp'
  | 'punctuation.definition.template-expression.end.esp'
  | 'punctuation.definition.typeparameters.begin.esp'
  | 'punctuation.definition.typeparameters.end.esp'
  | 'punctuation.destructuring.esp'
  | 'punctuation.section.embedded.begin.esp'
  | 'punctuation.section.embedded.end.esp'
  | 'punctuation.separator.comma.esp'
  | 'punctuation.separator.key-value.esp'
  | 'punctuation.separator.label.esp'
  | 'punctuation.separator.namespace.esp'
  | 'punctuation.separator.parameter.esp'
  | 'punctuation.terminator.statement.esp'
  | 'punctuation.whitespace.comment.leading.esp'
  | 'source.embedded.esp'
  | 'storage.modifier.async.esp'
  | 'storage.modifier.esp'
  | 'storage.type.class.esp'
  | 'storage.type.enum.esp'
  | 'storage.type.function.arrow.esp'
  | 'storage.type.function.esp'
  | 'storage.type.interface.esp'
  | 'storage.type.internaldeclaration.esp'
  | 'storage.type.esp'
  | 'storage.type.namespace.esp'
  | 'storage.type.numeric.bigint.esp'
  | 'storage.type.property.esp'
  | 'storage.type.type.esp'
  | 'string.quoted.double.esp'
  | 'string.quoted.single.esp'
  | 'string.regexp.esp'
  | 'string.template.esp'
  | 'support.class.component.esp'
  | 'support.class.esp'
  | 'support.class.promise.esp'
  | 'support.constant.esp'
  | 'support.type.builtin.esp'
  | 'support.type.object.module.esp'
  | 'support.type.primitive.esp'
  | 'support.variable.property.importmeta.esp'
  | 'support.variable.property.esp'
  | 'support.variable.property.target.esp'
  | 'switch-block.expr.esp'
  | 'switch-expression.expr.esp'
  | 'switch-statement.expr.esp'
  | 'variable.language.arguments.esp'
  | 'variable.language.super.esp'
  | 'variable.language.this.esp'
  | 'variable.object.property.esp'
  | 'variable.other.constant.esp'
  | 'variable.other.constant.object.esp'
  | 'variable.other.constant.object.property.esp'
  | 'variable.other.constant.property.esp'
  | 'variable.other.enummember.esp'
  | 'variable.other.object.esp'
  | 'variable.other.object.property.esp'
  | 'variable.other.property.esp'
  | 'variable.other.readwrite.alias.esp'
  | 'variable.other.readwrite.esp'
  | 'variable.parameter.esp';

export const scope = {
  caseClause: {
    expr: () => 'case-clause.expr.esp' as const,
  },
  comment: {
    block: Object.assign(() => 'comment.block.esp' as const, {
      documentation: () => 'comment.block.documentation.esp' as const,
    }),
    line: {
      doubleSlash: () => 'comment.line.double-slash.esp' as const,
      shebang: () => 'comment.line.shebang.esp' as const,
      tripleSlash: {
        directive: () => 'comment.line.triple-slash.directive.esp' as const,
      },
    },
  },
  constant: {
    character: {
      entity: () => 'constant.character.entity.esp' as const,
      escape: () => 'constant.character.escape.esp' as const,
    },
    language: {
      boolean: {
        false: () => 'constant.language.boolean.false.esp' as const,
        true: () => 'constant.language.boolean.true.esp' as const,
      },
      importExportAll: () => 'constant.language.import-export-all.esp' as const,
      infinity: () => 'constant.language.infinity.esp' as const,
      nan: () => 'constant.language.nan.esp' as const,
      null: () => 'constant.language.null.esp' as const,
      undefined: () => 'constant.language.undefined.esp' as const,
    },
    numeric: {
      binary: () => 'constant.numeric.binary.esp' as const,
      decimal: () => 'constant.numeric.decimal.esp' as const,
      hex: () => 'constant.numeric.hex.esp' as const,
      octal: () => 'constant.numeric.octal.esp' as const,
    },
  },
  entity: {
    name: {
      function: Object.assign(() => 'entity.name.function.esp' as const, {
        taggedTemplate: () =>
          'entity.name.function.tagged-template.esp' as const,
      }),
      label: () => 'entity.name.label.esp' as const,
      tag: Object.assign(() => 'entity.name.tag.esp' as const, {
        directive: () => 'entity.name.tag.directive.esp' as const,
        namespace: () => 'entity.name.tag.namespace.esp' as const,
      }),
      type: Object.assign(() => 'entity.name.type.esp' as const, {
        alias: () => 'entity.name.type.alias.esp' as const,
        class: () => 'entity.name.type.class.esp' as const,
        enum: () => 'entity.name.type.enum.esp' as const,
        interface: () => 'entity.name.type.interface.esp' as const,
        module: () => 'entity.name.type.module.esp' as const,
      }),
    },
    other: {
      attributeName: Object.assign(
        () => 'entity.other.attribute-name.esp' as const,
        {
          directive: () => 'entity.other.attribute-name.directive.esp' as const,
          namespace: () => 'entity.other.attribute-name.namespace.esp' as const,
        },
      ),
      inheritedClass: () => 'entity.other.inherited-class.esp' as const,
    },
  },
  invalid: {
    illegal: {
      attribute: () => 'invalid.illegal.attribute.esp' as const,
      badAmpersand: () => 'invalid.illegal.bad-ampersand.esp' as const,
      newline: () => 'invalid.illegal.newline.esp' as const,
    },
  },
  keyword: {
    control: Object.assign(() => 'keyword.control.esp' as const, {
      as: () => 'keyword.control.as.esp' as const,
      assert: () => 'keyword.control.assert.esp' as const,
      conditional: () => 'keyword.control.conditional.esp' as const,
      default: () => 'keyword.control.default.esp' as const,
      export: () => 'keyword.control.export.esp' as const,
      flow: () => 'keyword.control.flow.esp' as const,
      from: () => 'keyword.control.from.esp' as const,
      import: () => 'keyword.control.import.esp' as const,
      intrinsic: () => 'keyword.control.intrinsic.esp' as const,
      loop: () => 'keyword.control.loop.esp' as const,
      new: () => 'keyword.control.new.esp' as const,
      require: () => 'keyword.control.require.esp' as const,
      switch: () => 'keyword.control.switch.esp' as const,
      trycatch: () => 'keyword.control.trycatch.esp' as const,
      type: () => 'keyword.control.type.esp' as const,
      with: () => 'keyword.control.with.esp' as const,
    }),
    generator: {
      asterisk: () => 'keyword.generator.asterisk.esp' as const,
    },
    operator: {
      arithmetic: () => 'keyword.operator.arithmetic.esp' as const,
      assignment: Object.assign(
        () => 'keyword.operator.assignment.esp' as const,
        {
          compound: Object.assign(
            () => 'keyword.operator.assignment.compound.esp' as const,
            {
              bitwise: () =>
                'keyword.operator.assignment.compound.bitwise.esp' as const,
            },
          ),
        },
      ),
      bitwise: Object.assign(() => 'keyword.operator.bitwise.esp' as const, {
        shift: () => 'keyword.operator.bitwise.shift.esp' as const,
      }),
      comparison: () => 'keyword.operator.comparison.esp' as const,
      decrement: () => 'keyword.operator.decrement.esp' as const,
      definiteassignment: () =>
        'keyword.operator.definiteassignment.esp' as const,
      expression: {
        delete: () => 'keyword.operator.expression.delete.esp' as const,
        extends: () => 'keyword.operator.expression.extends.esp' as const,
        import: () => 'keyword.operator.expression.import.esp' as const,
        in: () => 'keyword.operator.expression.in.esp' as const,
        infer: () => 'keyword.operator.expression.infer.esp' as const,
        instanceof: () => 'keyword.operator.expression.instanceof.esp' as const,
        is: () => 'keyword.operator.expression.is.esp' as const,
        keyof: () => 'keyword.operator.expression.keyof.esp' as const,
        of: () => 'keyword.operator.expression.of.esp' as const,
        typeof: () => 'keyword.operator.expression.typeof.esp' as const,
        void: () => 'keyword.operator.expression.void.esp' as const,
      },
      increment: () => 'keyword.operator.increment.esp' as const,
      logical: () => 'keyword.operator.logical.esp' as const,
      new: () => 'keyword.operator.new.esp' as const,
      optional: () => 'keyword.operator.optional.esp' as const,
      relational: () => 'keyword.operator.relational.esp' as const,
      rest: () => 'keyword.operator.rest.esp' as const,
      spread: () => 'keyword.operator.spread.esp' as const,
      ternary: () => 'keyword.operator.ternary.esp' as const,
      type: Object.assign(() => 'keyword.operator.type.esp' as const, {
        annotation: () => 'keyword.operator.type.annotation.esp' as const,
        asserts: () => 'keyword.operator.type.asserts.esp' as const,
        modifier: () => 'keyword.operator.type.modifier.esp' as const,
      }),
    },
    other: Object.assign(() => 'keyword.other.esp' as const, {
      debugger: () => 'keyword.other.debugger.esp' as const,
    }),
  },
  meta: {
    arrayBindingPatternVariable: () =>
      'meta.array-binding-pattern-variable.esp' as const,
    array: {
      literal: () => 'meta.array.literal.esp' as const,
    },
    arrow: () => 'meta.arrow.esp' as const,
    block: () => 'meta.block.esp' as const,
    brace: {
      round: () => 'meta.brace.round.esp' as const,
      square: () => 'meta.brace.square.esp' as const,
    },
    class: () => 'meta.class.esp' as const,
    decorator: () => 'meta.decorator.esp' as const,
    delimiter: {
      decimal: {
        period: () => 'meta.delimiter.decimal.period.esp' as const,
      },
    },
    enum: {
      declaration: () => 'meta.enum.declaration.esp' as const,
    },
    export: Object.assign(() => 'meta.export.esp' as const, {
      default: () => 'meta.export.default.esp' as const,
    }),
    field: {
      declaration: () => 'meta.field.declaration.esp' as const,
    },
    functionCall: () => 'meta.function-call.esp' as const,
    function: Object.assign(() => 'meta.function.esp' as const, {
      expression: () => 'meta.function.expression.esp' as const,
    }),
    importEquals: {
      external: () => 'meta.import-equals.external.esp' as const,
      internal: () => 'meta.import-equals.internal.esp' as const,
    },
    import: () => 'meta.import.esp' as const,
    indexer: {
      declaration: () => 'meta.indexer.declaration.esp' as const,
      mappedtype: {
        declaration: () => 'meta.indexer.mappedtype.declaration.esp' as const,
      },
    },
    interface: () => 'meta.interface.esp' as const,
    method: {
      declaration: () => 'meta.method.declaration.esp' as const,
    },
    namespace: {
      declaration: () => 'meta.namespace.declaration.esp' as const,
    },
    objectBindingPatternVariable: () =>
      'meta.object-binding-pattern-variable.esp' as const,
    objectLiteral: {
      key: () => 'meta.object-literal.key.esp' as const,
    },
    object: {
      member: () => 'meta.object.member.esp' as const,
      type: () => 'meta.object.type.esp' as const,
    },
    objectliteral: () => 'meta.objectliteral.esp' as const,
    parameter: {
      arrayBindingPattern: () =>
        'meta.paramter.array-binding-pattern.esp' as const,
      objectBindingPattern: () =>
        'meta.parameter.object-binding-pattern.esp' as const,
    },
    parameters: () => 'meta.parameters.esp' as const,
    return: {
      type: Object.assign(() => 'meta.return.type.esp' as const, {
        arrow: () => 'meta.return.type.arrow.esp' as const,
      }),
    },
    tag: Object.assign(() => 'meta.tag.esp' as const, {
      attributes: () => 'meta.tag.attributes.esp' as const,
      withoutAttributes: () => 'meta.tag.without-attributes.esp' as const,
    }),
    template: {
      expression: () => 'meta.template.expression.esp' as const,
    },
    type: {
      annotation: () => 'meta.type.annotation.esp' as const,
      constructor: () => 'meta.type.constructor.esp' as const,
      declaration: () => 'meta.type.declaration.esp' as const,
      function: Object.assign(() => 'meta.type.function.esp' as const, {
        return: () => 'meta.type.function.return.esp' as const,
      }),
      infer: () => 'meta.type.infer.esp' as const,
      parameters: () => 'meta.type.parameters.esp' as const,
      paren: {
        cover: () => 'meta.type.paren.cover.esp' as const,
      },
      tuple: () => 'meta.type.tuple.esp' as const,
    },
    varSingleVariable: {
      expr: () => 'meta.var-single-variable.expr.esp' as const,
    },
    var: {
      expr: () => 'meta.var.expr.esp' as const,
    },
    new: {
      expr: () => 'new.expr.esp' as const,
    },
  },
  punctuation: {
    accessor: Object.assign(() => 'punctuation.accessor.esp' as const, {
      optional: () => 'punctuation.accessor.optional.esp' as const,
    }),
    decorator: Object.assign(() => 'punctuation.decorator.esp' as const, {
      internaldeclaration: () =>
        'punctuation.decorator.internaldeclaration.esp' as const,
    }),
    definition: {
      bindingPattern: {
        array: () =>
          'punctuation.definition.binding-pattern.array.esp' as const,
        object: () =>
          'punctuation.definition.binding-pattern.object.esp' as const,
      },
      block: () => 'punctuation.definition.block.esp' as const,
      comment: () => 'punctuation.definition.comment.esp' as const,
      entity: () => 'punctuation.definition.entity.esp' as const,
      parameters: {
        begin: () => 'punctuation.definition.parameters.begin.esp' as const,
        end: () => 'punctuation.definition.parameters.end.esp' as const,
      },
      string: {
        begin: () => 'punctuation.definition.string.begin.esp' as const,
        end: () => 'punctuation.definition.string.end.esp' as const,
        template: {
          begin: () =>
            'punctuation.definition.string.template.begin.esp' as const,
          end: () => 'punctuation.definition.string.template.end.esp' as const,
        },
      },
      tag: {
        begin: () => 'punctuation.definition.tag.begin.esp' as const,
        directive: () => 'punctuation.definition.tag.directive.esp' as const,
        end: () => 'punctuation.definition.tag.end.esp' as const,
      },
      templateExpression: {
        begin: () =>
          'punctuation.definition.template-expression.begin.esp' as const,
        end: () =>
          'punctuation.definition.template-expression.end.esp' as const,
      },
      typeparameters: {
        begin: () => 'punctuation.definition.typeparameters.begin.esp' as const,
        end: () => 'punctuation.definition.typeparameters.end.esp' as const,
      },
    },
    destructuring: () => 'punctuation.destructuring.esp' as const,
    section: {
      embedded: {
        begin: () => 'punctuation.section.embedded.begin.esp' as const,
        end: () => 'punctuation.section.embedded.end.esp' as const,
      },
    },
    separator: {
      comma: () => 'punctuation.separator.comma.esp' as const,
      keyValue: () => 'punctuation.separator.key-value.esp' as const,
      label: () => 'punctuation.separator.label.esp' as const,
      namespace: () => 'punctuation.separator.namespace.esp' as const,
      parameter: () => 'punctuation.separator.parameter.esp' as const,
    },
    terminator: {
      statement: () => 'punctuation.terminator.statement.esp' as const,
    },
    whitespace: {
      comment: {
        leading: () => 'punctuation.whitespace.comment.leading.esp' as const,
      },
    },
  },
  source: {
    embedded: {
      esp: () => 'source.embedded.esp' as const,
    },
  },
  storage: {
    modifier: Object.assign(() => 'storage.modifier.esp' as const, {
      async: () => 'storage.modifier.async.esp' as const,
    }),
    type: Object.assign(() => 'storage.type.esp' as const, {
      class: () => 'storage.type.class.esp' as const,
      enum: () => 'storage.type.enum.esp' as const,
      function: Object.assign(() => 'storage.type.function.esp' as const, {
        arrow: () => 'storage.type.function.arrow.esp' as const,
      }),
      interface: () => 'storage.type.interface.esp' as const,
      internaldeclaration: () =>
        'storage.type.internaldeclaration.esp' as const,
      namespace: () => 'storage.type.namespace.esp' as const,
      numeric: {
        bigint: () => 'storage.type.numeric.bigint.esp' as const,
      },
      property: () => 'storage.type.property.esp' as const,
      type: () => 'storage.type.type.esp' as const,
    }),
  },
  string: {
    quoted: {
      double: () => 'string.quoted.double.esp' as const,
      single: () => 'string.quoted.single.esp' as const,
    },
    regexp: () => 'string.regexp.esp' as const,
    template: () => 'string.template.esp' as const,
  },
  support: {
    class: Object.assign(() => 'support.class.esp' as const, {
      component: () => 'support.class.component.esp' as const,
      promise: () => 'support.class.promise.esp' as const,
    }),
    constant: () => 'support.constant.esp' as const,
    type: {
      builtin: () => 'support.type.builtin.esp' as const,
      object: {
        module: () => 'support.type.object.module.esp' as const,
      },
      primitive: () => 'support.type.primitive.esp' as const,
    },
    variable: {
      property: Object.assign(() => 'support.variable.property.esp' as const, {
        importmeta: () => 'support.variable.property.importmeta.esp' as const,
        target: () => 'support.variable.property.target.esp' as const,
      }),
    },
  },
  switchBlock: {
    expr: () => 'switch-block.expr.esp' as const,
  },
  switchExpression: {
    expr: () => 'switch-expression.expr.esp' as const,
  },
  switchStatement: {
    expr: () => 'switch-statement.expr.esp' as const,
  },
  variable: {
    language: {
      arguments: () => 'variable.language.arguments.esp' as const,
      super: () => 'variable.language.super.esp' as const,
      this: () => 'variable.language.this.esp' as const,
    },
    object: {
      property: () => 'variable.object.property.esp' as const,
    },
    other: {
      constant: Object.assign(() => 'variable.other.constant.esp' as const, {
        object: Object.assign(
          () => 'variable.other.constant.object.esp' as const,
          {
            property: () =>
              'variable.other.constant.object.property.esp' as const,
          },
        ),
        property: () => 'variable.other.constant.property.esp' as const,
      }),
      enummember: () => 'variable.other.enummember.esp' as const,
      object: Object.assign(() => 'variable.other.object.esp' as const, {
        property: () => 'variable.other.object.property.esp' as const,
      }),
      property: () => 'variable.other.property.esp' as const,
      readwrite: Object.assign(() => 'variable.other.readwrite.esp' as const, {
        alias: () => 'variable.other.readwrite.alias.esp' as const,
      }),
    },
    parameter: () => 'variable.parameter.esp' as const,
  },
};
