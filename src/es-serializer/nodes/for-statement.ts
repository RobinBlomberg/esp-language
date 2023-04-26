import { ForStatement, NodeType } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ForStatement[Yield, Await, Return] :
 *   for ( [lookahead ≠ let [] Expression[~In, ?Yield, ?Await]<opt> ;
 *     Expression[+In, ?Yield, ?Await]<opt> ; Expression[+In, ?Yield, ?Await]<opt> )
 *     Statement[?Yield, ?Await, ?Return]
 *   for ( var VariableDeclarationList[~In, ?Yield, ?Await] ; Expression[+In, ?Yield, ?Await]<opt> ;
 *     Expression[+In, ?Yield, ?Await]<opt> ) Statement[?Yield, ?Await, ?Return]
 *   for ( LexicalDeclaration[~In, ?Yield, ?Await] Expression[+In, ?Yield, ?Await]<opt> ;
 *     Expression[+In, ?Yield, ?Await]<opt> ) Statement[?Yield, ?Await, ?Return]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ForStatement
 */
export const writeForStatement: Writer<ForStatement> = (node, write) => {
  write('for');
  write('(');

  if (node.init) {
    write(node.init);

    if (node.init.type !== NodeType.VariableDeclaration) {
      write(';');
    }
  } else {
    write(';');
  }

  if (node.test) {
    write(node.test);
  }

  write(';');

  if (node.update) {
    write(node.update);
  }

  write(')');
  write(node.body);
};
