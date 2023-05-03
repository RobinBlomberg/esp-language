import { runInNewContext } from 'vm';
import { serializeWithSourceMap } from '../es-serializer';
import { parse } from '../esp-parser';
import { transformScript } from '../ir-es-transformer';
import { createRuntimeError, createSyntaxError } from './errors';
import { logError } from './log-error';

export const run = (source: string, sourceFileName?: string) => {
  console.clear();

  const parseResult = parse(source);

  if (parseResult.abrupt) {
    const error = createSyntaxError(
      source,
      sourceFileName,
      parseResult.start,
      parseResult.end,
    );
    logError(error, source, sourceFileName);
    process.exit(1);
  }

  const esAst = transformScript(parseResult);
  const { output, sourceMap } = serializeWithSourceMap(esAst);

  try {
    runInNewContext(output, { console });
  } catch (error) {
    const espError = createRuntimeError(
      error,
      sourceFileName,
      sourceMap,
      output,
    );

    if (espError) {
      logError(espError, source, sourceFileName);
    } else {
      throw error;
    }
  }
};
