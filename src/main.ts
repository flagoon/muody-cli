#!/usr/bin/env node

import chalk from 'chalk';

import { showHostsContent } from './config/hostsFunctions';
import { argv } from './helpers/argv';
import { showLogo } from './helpers/showLogo';

// For glory of the Muody
console.log(chalk.yellowBright(showLogo('Muody')));

const { _: mainCommands, $0: source, ...args } = argv;

console.log(argv);
console.log('********************');
showHostsContent().then(res => console.log(res[argv.host])).catch(err => console.log(err));
console.log('********************');
