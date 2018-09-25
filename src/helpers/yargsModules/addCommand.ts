import { Arguments, Argv } from 'yargs';

export const command = 'add';
export const describe =
    'Give the hostname and IP to which open the app. Login and password are not mandatory';
export const builder = (argv: Argv): Argv =>
    argv
        .options({
            host: {
                demandOption: true,
                describe: 'give the host name to add',
                type: 'string'
            },
            ip: {
                demandOption: true,
                describe: 'give the ip address',
                type: 'string'
            },
            login: {
                describe: 'give the login to be used for login',
                implies: 'password',
                type: 'string'
            },
            password: {
                alias: 'pass',
                describe: 'give the password',
                implies: 'login',
                type: 'string'
            }
        })
        .check((yargs: Arguments): boolean => {
            if (!yargs.host) {
                throw new Error('Host parameter needs a string value.');
            }
            if (!yargs.ip) {
                throw new Error('IP needs a valid IP number.');
            }
            if (yargs.login === '') {
                throw new Error('If login is provided, it should be a string.');
            }
            if (yargs.pass === '' || yargs.password === '') {
                throw new Error('If password is provided, it should be a string.');
            }
            return true;
        })
        .strict();

export const handler = (argv: Argv): Argv => argv;
