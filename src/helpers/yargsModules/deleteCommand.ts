import { Map } from 'immutable';
import { Arguments, Argv } from 'yargs';

import { isRegExp } from 'util';
import { showHostsContent } from '../../config/hostsFunctions';
import { IHostData, IHosts } from '../../config/IHosts';

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
        .check((args: Arguments): Promise<boolean> => {
            showHostsContent().then(res => {
                if (Object.keys(res).indexOf('stp')) {
                    console.log('She is back.');
                    return true;
                }
                return false;
            });

            throw new Error(`Host "${args.host}" doesn't exist.`);
        })
        .strict();
export const handler = (argv: Argv): Argv => argv;
