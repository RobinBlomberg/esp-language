import { runInNewContext } from 'vm';
import { ES } from '../../es';
import { parse } from '../parser';
import { transform } from '../transformer';
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

  const esAst = transform(parseResult);
  const { output, sourceMap } = ES.Serializer.serializeWithSourceMap(esAst);

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
