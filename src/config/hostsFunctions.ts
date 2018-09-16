import fs from 'fs';
import util from 'util';

import { IArgs } from '../helpers/IArgs';
import { default as hosts } from './hosts.json';
import { IHosts } from './IHosts';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);

export const getHosts = (): IHosts => hosts;

export const getHostsList = (): string[] => Object.keys(hosts);

export const showHostsContent = async (hostname: string = null): Promise<IHosts> => {
    let hostFile: string;
    try {
        hostFile = await readFile('./src/config/hosts.json', 'utf-8');
    } catch (err) {
        console.log(err);
    }

    if (hostname) {
        return JSON.parse(hostFile[hostname]);
    }

    return JSON.parse(hostFile);
};

export const handleJSONFile = async (command: string, args: IArgs): Promise<IHosts> => {
    const hostFile: IHosts = await showHostsContent();

    switch (command) {
        case 'add':
            break;
        case 'update':
            break;
        case 'delete':
            console.log(args);
            const test = await showHostsContent(args.host);
            console.log(test);
            const { zero = test.host, ...newHostFile } = hostFile;
            console.log(newHostFile);
            return Promise.resolve(newHostFile);
    }

};

export const deleteHost = async (hostname: string): Promise<object> => {
    return new Promise(async (resolve, reject) => {
        let hostFile: IHosts = {};

        try {
            hostFile = await showHostsContent();
        } catch (error) {
            reject(error);
        }

        delete hostFile[hostname];

        resolve(JSON.stringify(hostFile));
    });
};
