#!/usr/bin/node

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { run } from '../src/esp-vm';
import { generate } from '../src/esp-vscode-syntax-generator';

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
      const unresolvedPath = args[1];
      if (!unresolvedPath) {
        return logHelpAndExit();
      }

      const path = resolve(process.cwd(), unresolvedPath);
      await generate(path);
      break;
    }
    default: {
      const unresolvedPath = args[0];
      if (!unresolvedPath) {
        return logHelpAndExit();
      }

      const sourceFileName = resolve(process.cwd(), unresolvedPath);
      const source = readFileSync(sourceFileName, 'utf8');
      run(source, sourceFileName);
    }
  }
})();
