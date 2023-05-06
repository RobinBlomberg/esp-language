#!/usr/bin/node

import { ESP } from '../src/esp';

void ESP.Cli.run(process.argv.slice(2));
