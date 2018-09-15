import { Arguments, Argv } from 'yargs';
import { getHostsList } from '../../config/hostsFunctions';

const isGivenOptionValid = (options: string[]): boolean => {
  // valid options in application with default command.
  // TODO: keep track if it will not be needed other files... Then extract to separate module.
  const validOptions: string[] = ['d', 'b', 'i', 'x', 'l', 'localhost', 'host'];

  for (const option of options) {
    if (validOptions.indexOf(option) !== -1) {
      return true;
    }
  }
  return false;
};

export const command = '*';
export const describe = 'Generic commands for building, installing and docker.';
export const builder = (argv: Argv) => {
  return argv
    .options({
      host: {
        choices: getHostsList(),
        describe: 'Open app using credentials for given host.',
        type: 'string'
      },
      localhost: {
        alias: 'l',
        describe:
          'Starts localhost using credentials for given host. [Host is required].'
      }
    })
    .check((yargs: Arguments) => {
      const { _, $0, ...options } = yargs;

      // this is default command, it will throw error on invalid command.
      if (_.length !== 0) {
        throw new Error(`Command "${_}" is not recognized.`);
      }

      if (options.length === 0) {
        throw new Error('Default command needs some options.');
      }

      // if host is empty string (--host) or if it had value, but not in config file, throw error.
      if (
        options.host === '' ||
        (options.host !== undefined &&
          getHostsList().indexOf(options.host) === -1)
      ) {
        throw new Error(`Host argument needs to be in: ${getHostsList()}.`);
      }

      // only valid options will pass. yargs.strict() don't cooperate.
      if (!isGivenOptionValid(Object.keys(options))) {
        throw new Error(
          'There are no options given, or one of them is invalid.'
        );
      }

      // localhost shouldn't be called when there is no host given
      // TODO: reconsider, if host should have default value, without config...
      if (options.localhost && !options.host) {
        throw new Error("You can't use localhost option without giving host.");
      }
    })
    .describe(
      'd',
      'Stops all dockers, remove containers and uses npm run start.'
    )
    .describe('i', 'Install the modules.')
    .describe('b', 'Build the app.')
    .describe('x', 'Stops all containers, remove them and then remove images.');
};
export const handler = (argv: Arguments): Arguments => argv;
