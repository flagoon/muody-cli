#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs';
import Listr from 'listr';
import yargs from 'yargs';

import moduleCommands from './commands/libsCommands';
import { handleJSONFile } from './config/hostsFunctions';
import { argv } from './helpers/argv';
import { showLogo } from './helpers/showLogo';

// For glory of the Muody
console.log(chalk.yellowBright(showLogo('Muody')));

const modules = new Listr(moduleCommands);

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
} else {
    modules
        .run()
        .then(() =>
            console.log(
                chalk.black.bgGreen(
                    '\n All commands were run with success. \n'
                )
            )
        )
        .catch(err => console.log(err));
}
