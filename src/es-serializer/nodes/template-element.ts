import { TemplateElement } from '../../es-ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * TemplateLiteral[Yield, Await, Tagged] :
 *   ...
 *   SubstitutionTemplate[?Yield, ?Await, ?Tagged]
 *
 * SubstitutionTemplate[Yield, Await, Tagged] :
 *   ... Expression[+In, ?Yield, ?Await] ...
 *
 * TemplateSpans[Yield, Await, Tagged] :
 *   ...
 *   TemplateMiddleList[?Yield, ?Await, ?Tagged] ...
 *
 * TemplateMiddleList[Yield, Await, Tagged] :
 *   ... Expression[+In, ?Yield, ?Await]
 *   TemplateMiddleList[?Yield, ?Await, ?Tagged] ... Expression[+In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-TemplateLiteral
 */
export const writeTemplateElement: Writer<TemplateElement> = (node, write) => {
  write(node.value.raw);
};
