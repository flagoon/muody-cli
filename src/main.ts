#!/usr/bin/env node

import chalk from 'chalk';

import fs from 'fs';
import util from 'util';
import { handleJSONFile } from './config/hostsFunctions';
import { argv } from './helpers/argv';
import { showLogo } from './helpers/showLogo';

const writeFile = util.promisify(fs.writeFile);

// For glory of the Muody
console.log(chalk.yellowBright(showLogo('Muody')));

const { _: mainCommands, $0: source, ...args } = argv;

handleJSONFile(mainCommands[0], args).then(res => {
    const stringifiedResponse: string = JSON.stringify(res);
    // writeFile('./src/config/hosts.json', stringifiedResponse);

    console.log(stringifiedResponse);
}).catch(error => {
    console.log(error);
});
