import { Map } from 'immutable';
import { Arguments, Argv } from 'yargs';

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
        .check(async (): Promise<boolean> => {
            const hosts: IHosts = await showHostsContent();
            const mappedHosts = Map(hosts);
            const host = argv;
            console.log(argv.parsed.);
            // if (mappedHosts.has(argv.argv.host)) {
            //     throw new Error("Can't delete profile that doesn't exist.");
            //     return false;
            // }

            return true;
        })
        .strict();
export const handler = (argv: Argv): Argv => argv;
