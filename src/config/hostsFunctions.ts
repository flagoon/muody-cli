import fs from 'fs';
import util from 'util';

import { default as hosts } from './hosts.json';
import { IHosts } from './IHosts';

export const getHosts = (): IHosts => hosts;

export const getHostsList = (): string[] => Object.keys(hosts);

export const showHostsContent = async (): Promise<IHosts> => {
    const readFile = util.promisify(fs.readFile);
    let test;
    try {
        test = await readFile('./src/config/hosts.json', 'utf-8');
    } catch (err) {
        console.log(err);
    }
    return JSON.parse(test);
};
