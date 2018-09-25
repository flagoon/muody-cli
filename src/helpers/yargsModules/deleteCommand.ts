import { Argv } from 'yargs';

export const command = 'delete';
export const describe = 'Give the hostname to be removed';
export const builder = (argv: Argv): Argv =>
    argv
        .option({
            host: {
                demandOption: true,
                describe: 'give the host name to remove',
                type: 'string'
            }
        })
        .strict();
export const handler = (argv: Argv): Argv => argv;
