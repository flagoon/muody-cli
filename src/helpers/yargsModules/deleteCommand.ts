import { Arguments, Argv } from 'yargs';
import { getHostsList } from '../../config/hostsFunctions';

export const command = 'delete';
export const describe = 'Give the hostname to be removed';
export const builder = (argv: Argv): Argv =>
  argv
    .option({
      host: {
        choices: getHostsList(),
        describe: 'give the host name to remove',
        type: 'string'
      }
    })
    .check((yargs: Arguments) => {
      const { _, $0, ...options } = yargs;

      if (options.host === '' || options.host === undefined) {
        throw new Error('Host is required.');
      }

      if (getHostsList().indexOf(options.host) === -1) {
        throw new Error(`Host must be valid [${getHostsList()}]`);
      }
    });
export const handler = (argv: Argv): Argv => argv;
