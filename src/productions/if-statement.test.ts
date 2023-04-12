import { suite, test } from 'vitest';
import { BlockStatement, Identifier, IfStatement } from '../ast';
import { createParseAssert } from '../test-utils';
import { parseIfStatement } from './if-statement';

const { failAllSubstrings, ok } = createParseAssert(parseIfStatement);

suite('IfStatement', () => {
  test('"if ( Expression ) Statement else Statement"', () => {
    ok(
      'if (a) {} else {}',
      IfStatement(
        0,
        17,
        Identifier(4, 5, 'a'),
        BlockStatement(7, 9, []),
        BlockStatement(15, 17, []),
      ),
    );
    failAllSubstrings('if (a) {');
  });

  test('"if ( Expression ) Statement"', () => {
    ok(
      'if (a) {}',
      IfStatement(0, 9, Identifier(4, 5, 'a'), BlockStatement(7, 9, []), null),
    );
    failAllSubstrings('if (a) {');
  });
});
