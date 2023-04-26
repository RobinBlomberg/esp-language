import { runInNewContext } from 'node:vm';
import { serialize } from '../es-serializer';
import { transformScript } from '../esp-es-transformer';
import { abrupt } from '../esp-lexer';
import { parseScript } from '../esp-parser';

export const run = (script: string) => {
  const parseResult = parseScript(script, 0);

  if (abrupt(parseResult)) {
    const index = parseResult.start;
    const character =
      index < script.length
        ? `character ${JSON.stringify(script[index])}`
        : 'end of file';
    console.error(`SyntaxError: Unexpected ${character} at index ${index}`);
    process.exit(1);
  }

  const esAst = transformScript(parseResult);
  const esScript = serialize(esAst);
  runInNewContext(esScript, { console });
};
