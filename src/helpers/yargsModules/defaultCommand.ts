import { Arguments, Argv } from 'yargs';
import { getHostsList } from '../../config/hostsFunctions';

    // TODO: keep track if it will not be needed other files... Then extract to separate module.
export const command = '*';
export const describe = 'Generic commands for building, installing and docker.';
export const builder = (argv: Argv) => {
    return argv
        .options({
            host: {
                choices: getHostsList(),
                describe: 'Open app using credentials for given host. Host is required.',
                type: 'string'
            },
            localhost: {
                alias: 'l',
                describe: 'Starts localhost using credentials for given host. Host is required.',
                implies: 'host'
            // TODO: reconsider, if host should have default value, without config...
            }
        })
        .describe('d', 'Stops all dockers, remove containers and uses npm run start.')
        .describe('i', 'Install the modules.')
        .describe('b', 'Build the app.')
        .describe('x', 'Stops all containers, remove them and then remove images.');
};
export const handler = (argv: Arguments): Arguments => argv;
