import { TaggedTemplateExpression } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * MemberExpression[Yield, Await] :
 *   ...
 *   MemberExpression[?Yield, ?Await] TemplateLiteral[?Yield, ?Await, +Tagged]
 *   ...
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-MemberExpression
 */
export const writeTaggedTemplateExpression: Writer<TaggedTemplateExpression> = (
  node,
  write,
) => {
  write(node.tag);
  write(node.quasi);
};
