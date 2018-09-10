#!/usr/bin/env node

import chalk from 'chalk';

import { argv } from './helpers/argv';
import { showLogo } from './helpers/showLogo';

// For glory of the Muody
console.log(chalk.yellowBright(showLogo('Muody')));

const { _: mainCommands, $0: source, ...args } = argv;

console.log(argv);
