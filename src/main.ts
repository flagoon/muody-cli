#!/usr/bin/env node

import chalk from 'chalk';

import fs from 'fs';
import util from 'util';
import { deleteHost, handleJSONFile, showHostsContent } from './config/hostsFunctions';
import { IHosts } from './config/IHosts';
import { argv } from './helpers/argv';
import { showLogo } from './helpers/showLogo';

const writeFile = util.promisify(fs.writeFile);

// For glory of the Muody
console.log(chalk.yellowBright(showLogo('Muody')));

const { _: mainCommands, $0: source, ...args } = argv;

handleJSONFile('add', args).then(res => {
    console.log('----');
    console.log(JSON.stringify(res));
    console.log('----');
});
