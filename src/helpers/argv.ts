import yargs from 'yargs';

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
    .alias('h', 'help')
    .help('h')
    .version()
    .strict()
    .epilog('copyright flagoon 2018').argv;
