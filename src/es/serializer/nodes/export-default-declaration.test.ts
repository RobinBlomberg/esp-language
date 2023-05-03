import { expect, suite, test } from 'vitest';
import {
  AnonymousDefaultExportedClassDeclaration,
  AnonymousDefaultExportedFunctionDeclaration,
  BlockStatement,
  ClassBody,
  ExportDefaultDeclaration,
  Identifier,
} from '../../ast';
import { serialize } from '../serialize';

suite('ExportDefaultDeclaration', () => {
  test('export default HoistableDeclaration[~Yield, +Await, +Default]', () => {
    expect(
      serialize(
        ExportDefaultDeclaration(
          AnonymousDefaultExportedFunctionDeclaration(
            [],
            BlockStatement([]),
            false,
            false,
          ),
        ),
      ),
    ).toBe('export default function(){}');
  });

  test('export default ClassDeclaration[~Yield, +Await, +Default]', () => {
    expect(
      serialize(
        ExportDefaultDeclaration(
          AnonymousDefaultExportedClassDeclaration(null, ClassBody([])),
        ),
      ),
    ).toBe('export default class{}');
  });

  test(
    'export default [lookahead ∉ { function, async [no LineTerminator here] function, class }] ' +
      'AssignmentExpression[+In, ~Yield, +Await] ;',
    () => {
      expect(serialize(ExportDefaultDeclaration(Identifier('a')))).toBe(
        'export default a;',
      );
    },
  );
});
