import { expect, suite, test } from 'vitest';
import { TemplateElement } from '../../ast';
import { serialize } from '../serialize';

suite('TemplateElement', () => {
  suite('SubstitutionTemplate[Yield, Await, Tagged]', () => {
    suite(
      'TemplateHead Expression[+In, ?Yield, ?Await] ' +
        'TemplateSpans[?Yield, ?Await, ?Tagged]',
      () => {
        test('Expression[+In, ?Yield, ?Await]', () => {
          expect(
            serialize(TemplateElement(false, { cooked: 'abc', raw: 'a\\bc' })),
          ).toBe('a\\bc');
        });
      },
    );
  });
});
