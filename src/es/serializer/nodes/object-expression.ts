import { ObjectExpression } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * ObjectLiteral[Yield, Await] :
 *   { }
 *   { PropertyDefinitionList[?Yield, ?Await] }
 *   { PropertyDefinitionList[?Yield, ?Await] , }
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-ObjectLiteral
 */
export const writeObjectExpression: Writer<ObjectExpression> = (
  node,
  write,
) => {
  write('{');

  for (let i = 0; i < node.properties.length; i++) {
    if (i >= 1) {
      write(',');
    }

    write(node.properties[i]!);
  }

  write('}');
};
