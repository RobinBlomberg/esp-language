import { Program } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * Script :
 *   ScriptBody<opt>
 *
 * ScriptBody :
 *   StatementList[~Yield, ~Await, ~Return]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-Script
 */
export const writeProgram: Writer<Program> = (node, write) => {
  for (const statement of node.body) {
    write(statement);
  }
};
