import { Argv } from 'yargs';
import { getHostsList } from '../../config/hostsFunctions';

export const command = 'update';
export const describe =
  'Give the hostname and parameters to change (ip, login or password)';
export const builder = (argv: Argv) =>
  argv.options({
    host: {
      choices: getHostsList(),
      demandOption: true,
      describe: 'give the host name to update',
      type: 'string'
    },
    ip: {
      describe: 'give the ip address',
      implies: 'host',
      type: 'string'
    },
    login: {
      alias: 'l',
      describe: 'give the login to be used for login',
      implies: 'host',
      type: 'string'
    },
    password: {
      alias: 'pass',
      describe: 'give the password',
      implies: 'host',
      type: 'string'
    }
  });
export const handler = (argv: Argv) => argv;
