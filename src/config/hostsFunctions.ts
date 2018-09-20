import fs, { exists } from 'fs';
import { Map } from 'immutable';
import util from 'util';

import { IArgs } from '../helpers/IArgs';
import { default as hosts } from './hosts.json';
import { IHostData, IHosts } from './IHosts';

const readFile = util.promisify(fs.readFile);

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

export const createIHostObject = (args: IArgs): IHostData => {
    const { ip, login, password } = args;
    const createdIHostObject: IHostData = { ip };
    if (login !== undefined) {
        createdIHostObject.login = login;
    }
    if (password !== undefined) {
        createdIHostObject.password = password;
    }

    return createdIHostObject; // {host: { ip: ip, login: login, password: password }}
};

export const handleJSONFile = async (command: string, args: IArgs): Promise<Map<string, IHostData>> => {
    // TODO: error handling
    const hostFile: IHosts = await showHostsContent();
    const mapHostFile: Map<string, IHostData> = Map(hostFile);
    const newHostToAdd: IHostData = createIHostObject(args);

    switch (command) {
        case 'add':
            if (!mapHostFile.has(args.host)) {
                const changedHosts: Map<string, IHostData> = mapHostFile.set(args.host, newHostToAdd);
                return Promise.resolve(changedHosts);
            }

            return Promise.reject('This profile already exists. Try muody update --host=...');
        case 'update':
            if (mapHostFile.has(args.host)) {
                const changedHosts: Map<string, IHostData> = mapHostFile.set(args.host, newHostToAdd);
                return Promise.resolve(changedHosts);
            }

            return Promise.reject("Can't update profile that doesn't exists.");
        case 'delete':
            if (mapHostFile.has(args.host)) {
                const reducedHosts: Map<string, IHostData> = mapHostFile.delete(args.host);
                return Promise.resolve(reducedHosts);
            }

            return Promise.reject("This host doesn't exists.");
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
