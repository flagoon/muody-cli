import yargs from 'yargs';
import { getHostsList } from '../config/hostsFunctions';

import * as addCommand from '../helpers/yargsModules/addCommand';
import * as defaultCommand from '../helpers/yargsModules/defaultCommand';
import * as deleteCommand from '../helpers/yargsModules/deleteCommand';
import * as updateCommand from '../helpers/yargsModules/updateCommands';

// TODO:https://github.com/yargs/yargs/blob/master/docs/api.md
// export const argv = yargs
//     .usage('Usage: $0 <command> [options]')
//     .describe('b', 'npm run build')
//     .describe('d', 'stop all dockers, then remove all containers')
//     .describe('i', 'install libraries from package.json')
//     .describe('p', 'remove all docker containers and images')
//     .describe('host', 'choose the host to log into')
//     .choices('host', getHostsList())
//     .describe('l', 'open localhost:8090 with credentials for host')
//     .describe('L', 'open localhost:8090/admin with credentials for host')
//     .help('h')
//     .alias({ h: 'help', b: 'build', d: 'docker', p: 'prune', i: 'install', v: 'version' })
//     .strict()
//     .version()
//     .epilog('copyright flagoon 2018').argv;

export const argv = yargs
    .usage('Usage: $0 <command> [options]')
    // tslint:disable-next-line:no-var-requires
    .command(addCommand)
    .command(updateCommand)
    .command(deleteCommand)
    .command(defaultCommand)
    .help('h')
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
