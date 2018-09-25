/* tslint:disable object-literal-sort-keys */

import execa from 'execa';
import { IListr } from './IListr';

// stop all containers
export const stopAllContainers = async (): Promise<void> => {
  const containers: string[] = await getAllIdFromDockerContainers();

  for (const container of containers) {
    await execa('docker', ['stop', container]);
  }
};
// remove all containers
export const removeAllContainers = async (): Promise<void> => {
  const containers: string[] = await getAllIdFromDockerContainers();

  for (const container of containers) {
    await execa('docker', ['rm', container]);
  }
};

// remove all images
const removeAllImages = async (): Promise<void> => {
  const images: string[] = await getAllIdFromDockerImages();

  for (const image of images) {
    await execa('docker', ['rmi', image]);
  }
};

export const dockerCommands: IListr[] = [
  {
    title: 'Stop the containers.',
    task: (ctx, task) =>
      stopAllContainers().catch(() => {
        // we trying to remove containers, when there are no containers, error is thrown.
        ctx.containersAvailable = false; // we assign 'false' to ctx object, to use it in other tests.
        task.skip('There are no containers to stop!'); // we skipping this task, with reason.
      })
  },
  {
    title: 'Remove all containers.',
    enabled: ctx => ctx.containersAvailable !== false,
    task: () => removeAllContainers()
  },
  {
    title: 'Remove all images.',
    skip: async () => {
      const isImages = await getAllIdFromDockerImages();
      if (isImages === null) {
        return 'There are no images available!';
      }
    },
    task: () => removeAllImages()
  }
];

// retrieve list of available docker containers.
const getAllIdFromDockerContainers = async (): Promise<string[]> => {
  const listOfContainers = await execa('docker', ['ps', '-qa']);
  if (listOfContainers.stdout === '') {
    return null;
  }

  return listOfContainers.stdout.split('\n');
};

// retrieve list of available docker images.
const getAllIdFromDockerImages = async (): Promise<string[]> => {
  const listOfImages = await execa('docker', ['images', '-qa']);
  if (listOfImages.stdout === '') {
    return null;
  }

  return listOfImages.stdout.split('\n');
};

export const getRunningContainers = async (): Promise<string[]> => {
  const listOFRunningContainers = await execa('docker', ['ps', '-q']);
  if (listOFRunningContainers.stdout === '') {
    return null;
  }

  return listOFRunningContainers.stdout.split('\n');
};
