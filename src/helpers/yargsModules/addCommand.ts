import { Arguments, Argv } from 'yargs';

export const command = 'add';
export const describe = 'Give the hostname and IP to which open the app. Login and password are not mandatory';
export const builder = (argv: Argv): Argv =>
    argv.options({
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
            alias: 'l',
            describe: 'give the login to be used for login',
            type: 'string'
        },
        password: {
            alias: 'pass',
            describe: 'give the password',
            type: 'string'
        }
    });
// TODO: make this work:)
export const handler = (args: Arguments) => {
    if (args.host) {
        console.log(args.host);
    } else {
        throw new Error("Host can't be empty");
    }
    console.log(args);
};
