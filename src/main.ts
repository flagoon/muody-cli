#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs';
import yargs from 'yargs';

import { handleJSONFile } from './config/hostsFunctions';
import { argv } from './helpers/argv';
import { showLogo } from './helpers/showLogo';

// For glory of the Muody
console.log(chalk.yellowBright(showLogo('Muody')));

const { _: mainCommands, $0: source, ...args } = argv;

if (mainCommands[0]) {
    handleJSONFile(mainCommands[0], args)
        .then(res => {
            const stringifiedResponse: string = JSON.stringify(res);
            fs.writeFile('./src/config/hosts.json', stringifiedResponse, () => {
                console.log('File saved');
            });

            console.log(stringifiedResponse);
        }).catch(error => {
            yargs.showHelp();
            console.log(error);
        });
}

console.log('dupa');
