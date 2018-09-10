import { Argv } from 'yargs';
import { getHostsList } from '../../config/hostsFunctions';

export const command = 'delete';
export const describe = 'Give the hostname to be removed';
export const builder = (argv: Argv): Argv =>
    argv.option({
        host: {
            choices: getHostsList(),
            demandOption: true,
            describe: 'give the host name to remove',
            type: 'string'
        }
    });
export const handler = (argv: Argv): Argv => argv;
