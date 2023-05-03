import { VariableDeclaration } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * VariableStatement[Yield, Await] :
 *   var VariableDeclarationList[+In, ?Yield, ?Await] ;
 *
 * VariableDeclarationList[In, Yield, Await] :
 *   VariableDeclaration[?In, ?Yield, ?Await]
 *   VariableDeclarationList[?In, ?Yield, ?Await] , VariableDeclaration[?In, ?Yield, ?Await]
 *
 * VariableDeclaration[In, Yield, Await] :
 *   BindingIdentifier[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]<opt>
 *   BindingPattern[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]
 *
 * LexicalDeclaration[In, Yield, Await] :
 *   LetOrConst BindingList[?In, ?Yield, ?Await] ;
 *
 * LetOrConst :
 *   let
 *   const
 *
 * BindingList[In, Yield, Await] :
 *   LexicalBinding[?In, ?Yield, ?Await]
 *   BindingList[?In, ?Yield, ?Await] , LexicalBinding[?In, ?Yield, ?Await]
 *
 * LexicalBinding[In, Yield, Await] :
 *   BindingIdentifier[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]<opt>
 *   BindingPattern[?Yield, ?Await] Initializer[?In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-VariableStatement
 * @see https://tc39.es/ecma262/#prod-LexicalDeclaration
 */
export const writeVariableDeclaration: Writer<VariableDeclaration> = (
  node,
  write,
) => {
  write(node.kind);

  for (let i = 0; i < node.declarations.length; i++) {
    if (i >= 1) {
      write(',');
    }

    write(node.declarations[i]!);
  }

  write(';');
};
