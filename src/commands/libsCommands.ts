/* tslint:disable object-literal-sort-keys */

import execa from 'execa';
import Listr from 'listr';

import folders from '../config/folders.json';
import { argv } from '../helpers/argv';

import {
  dockerCommands,
  getRunningContainers,
  stopAllContainers
} from './dockerCommands';

const { d, i, b, x } = argv;

const moduleCommands = [
  {
    title: 'Installing modules',
    enabled: () => i,
    task: async ctx => {
      ctx.removeDist = true;
      await execa('npm', ['i']);
    }
  },
  {
    title: 'Purge the docker',
    enabled: () => x,
    task: () => new Listr(dockerCommands)
  },
  {
    title: 'Stop running containers',
    enabled: () => d,
    task: async (ctx, task) => {
      const containers = await getRunningContainers();
      if (containers === null) {
        task.skip('No containers to stop!');
      } else {
        return stopAllContainers();
      }
    }
  },
  {
    title: 'Starting the docker',
    enabled: () => d,
    task: () => execa('npm', ['start'])
  },
  {
    title: 'Building the app',
    enabled: () => b,
    task: () =>
      new Listr([
        {
          title: 'Removing dist folder.',
          task: async () => await execa('rm', ['-rf', 'dist'])
        },
        {
          title: 'Building the package.',
          task: async ctx => {
            ctx.removeDist = false;
            await execa('npm', ['run', 'build']);
          }
        }
      ])
  },
  {
    title: 'Remove dist folder.',
    enabled: ctx => ctx.removeDist,
    task: () => execa('rm', ['-rf', 'dist'])
  }
];

const extractFolderName = folder => folder.split('/').pop();

folders.forEach(folder => {
  const folderName = extractFolderName(folder);
  const task = {
    title: `Removing ${folderName}`,
    enabled: () => i,
    task: () => execa('rm', ['-rf', folder])
  };
  moduleCommands.unshift(task);
});

export default moduleCommands;
