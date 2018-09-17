import fs from 'fs';
import { Map } from 'immutable';
import util from 'util';

import { IArgs } from '../helpers/IArgs';
import { default as hosts } from './hosts.json';
import { IHostData, IHosts } from './IHosts';

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

// TODO: keep an eye on it
export const createIHostObject = (args: IArgs): IHosts => {
    const { host, ip = '', login = '', password = '' } = args;

    return { ip, login, password }; // {host: { ip: ip, login: login, password: password }}
};

// TODO: deal with new object and it's types.
export const handleJSONFile = async (command: string, args: IArgs): Promise<Map<string, IHostData>> => {
    const hostFile: IHosts = await showHostsContent();
    const mapHostFile: Map<string, IHostData> = Map(hostFile);
    const newHostToAdd: IHosts = createIHostObject(args);

    switch (command) {
        case 'add':
            console.log(newHostToAdd);
            console.log(mapHostFile.setIn([args.host], { args.ip, args.login, args.password }));

            // const addedHosts: Map<string, IHostData> = mapHostFile.set;
            break;
        case 'update':
            break;
        case 'delete':
            const reducedHosts: Map<string, IHostData> = mapHostFile.delete(args.host);
            return Promise.resolve(reducedHosts);
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
