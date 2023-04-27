import { runInNewContext } from 'node:vm';
import { clear, red } from '../ansi-escape-codes';
import { serialize } from '../es-serializer';
import { transformScript } from '../esp-es-transformer';
import { abrupt } from '../esp-lexer';
import { parseScript } from '../esp-parser';

const logSyntaxError = (script: string, errorIndex: number) => {
  let line = 1;
  let column = 1;
  let lineStart = 0;
  let lineEnd = script.length;

  for (let i = 0; i < script.length; i++) {
    if (script[i] === '\n' || (script[i] === '\r' && script[i + 1] !== '\n')) {
      if (i > errorIndex) {
        lineEnd = i;
        break;
      }

      line++;
      column = 1;
      lineStart = i + 1;
    } else if (i < errorIndex) {
      column++;
    }
  }

  const character =
    errorIndex < script.length
      ? `character ${JSON.stringify(script[errorIndex])}`
      : 'end of file';

  console.error(script.slice(lineStart, lineEnd));
  console.error(`${' '.repeat(errorIndex - lineStart)}^`);
  console.error();
  console.error(`${red}(${line}:${column}) Unexpected ${character}${clear}`);
  console.error();
};

export const run = (script: string) => {
  console.clear();

  const parseResult = parseScript(script, 0);

  if (abrupt(parseResult)) {
    logSyntaxError(script, parseResult.start);
    process.exit(1);
  }

  const esAst = transformScript(parseResult);
  const esScript = serialize(esAst);
  runInNewContext(esScript, { console });
};
