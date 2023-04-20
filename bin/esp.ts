#!/usr/bin/node

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { run } from '../src/vm/run';

const path = join(process.cwd(), process.argv[2]!);
const script = readFileSync(path, 'utf8');
run(script);
