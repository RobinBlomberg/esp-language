import { runInNewContext } from 'vm';
import { serializeWithSourceMap } from '../es-serializer/serialize';
import { transformScript } from '../esp-es-transformer';
import { abrupt } from '../esp-lexer';
import { parseScript } from '../esp-parser';
import { createRuntimeError, createSyntaxError } from './errors';
import { logError } from './log-error';

export const run = (source: string, sourcePath?: string) => {
  console.clear();

  const parseResult = parseScript(source, 0);

  if (abrupt(parseResult)) {
    const error = createSyntaxError(source, parseResult.start, parseResult.end);
    logError(error, source, sourcePath);
    process.exit(1);
  }

  const esAst = transformScript(parseResult);
  const { output, sourceMap } = serializeWithSourceMap(esAst);

  try {
    runInNewContext(output, { console });
  } catch (error) {
    const espError = createRuntimeError(error, sourcePath, sourceMap, output);

    if (espError) {
      logError(espError, source, sourcePath);
    } else {
      throw error;
    }
  }
};
