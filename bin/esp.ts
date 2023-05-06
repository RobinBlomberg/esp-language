#!/usr/bin/node

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ESP } from '../src/esp';

const logHelpAndExit = () => {
  console.info('Usage: esp [options] <file>');
  console.info();
  console.info('Options:');
  console.info(
    '  --generate-syntax  generate a syntax highlighting file for VS Code',
  );
  console.info();
  process.exit(1);
};

(async () => {
  const args = process.argv.slice(2);

  switch (args[0]) {
    case '--generate-syntax': {
      const pathInput = args[1];
      if (!pathInput) {
        return logHelpAndExit();
      }

      const unresolvedPaths = pathInput.split(',');

      await Promise.all(
        unresolvedPaths.map(async (unresolvedPath) => {
          const path = resolve(process.cwd(), unresolvedPath);
          await ESP.VSCodeSyntaxGenerator.generate(path);
        }),
      );

      break;
    }
    default: {
      const unresolvedPath = args[0];
      if (!unresolvedPath) {
        return logHelpAndExit();
      }

      const sourceFileName = resolve(process.cwd(), unresolvedPath);
      const source = readFileSync(sourceFileName, 'utf8');
      ESP.VM.run(source, sourceFileName);
    }
  }
})();
