import { TemplateLiteral } from '../../ast';
import { Writer } from '../serialize';

/**
 * ```ecmarkup
 * TemplateLiteral[Yield, Await, Tagged] :
 *   NoSubstitutionTemplate
 *   SubstitutionTemplate[?Yield, ?Await, ?Tagged]
 *
 * SubstitutionTemplate[Yield, Await, Tagged] :
 *   TemplateHead Expression[+In, ?Yield, ?Await] TemplateSpans[?Yield, ?Await, ?Tagged]
 *
 * TemplateSpans[Yield, Await, Tagged] :
 *   TemplateTail
 *   TemplateMiddleList[?Yield, ?Await, ?Tagged] TemplateTail
 *
 * TemplateMiddleList[Yield, Await, Tagged] :
 *   TemplateMiddle Expression[+In, ?Yield, ?Await]
 *   TemplateMiddleList[?Yield, ?Await, ?Tagged] TemplateMiddle Expression[+In, ?Yield, ?Await]
 * ```
 *
 * @see https://tc39.es/ecma262/#prod-TemplateLiteral
 */
export const writeTemplateLiteral: Writer<TemplateLiteral> = (node, write) => {
  write('`');

  for (let i = 0; i < node.quasis.length; i++) {
    write(node.quasis[i]!);

    const expression = node.expressions[i];

    if (expression) {
      write('${', true);
      write(expression);
      write('}');
    }
  }

  write('`');
};
