import yargs from 'yargs';

import chalk from 'chalk';
import * as addCommand from '../helpers/yargsModules/addCommand';
import * as defaultCommand from '../helpers/yargsModules/defaultCommand';
import * as deleteCommand from '../helpers/yargsModules/deleteCommand';
import * as updateCommand from '../helpers/yargsModules/updateCommands';

export const argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command(addCommand)
    .command(updateCommand)
    .command(deleteCommand)
    .command(defaultCommand)
    .fail((msg, err) => {
        if (err) {
            console.log('');
            console.log(chalk.black.bgRedBright(`${err.message} Try muody --help for more info.`));
            console.log('');
            yargs.showHelp();
            process.exit(1);
        }
    })
    .help('h')
    .alias('h', 'help')
    .strict()
    .version()
    .epilog('copyright flagoon 2018').argv;

export default class Args {
    private acceptedArgs: string[] = ['d', 'i', 'b', 'x', 'l'];
    private acceptedCommands: string[] = ['kvm10', 'cux21', 'cux55', 'cux58', 'cux59'];

    public handleCLIArgs(commands: string[], args: { [argName: string]: any }) {
        if (!this.handleCommands(commands) || !this.handleArgs(args)) {
            return false;
        }

        return true;
    }

    private handleCommands(commands: string[]) {
        for (const command of commands) {
            if (this.acceptedCommands.indexOf(command) < 0) {
                return false;
            }
        }

        return true;
    }

    private handleArgs(args: { [argName: string]: any }) {
        for (const arg in args) {
            if (args.hasOwnProperty(arg)) {
                console.log(arg);
            }
        }

        return true;
    }
}
