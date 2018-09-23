import fs from 'fs';
import { Map } from 'immutable';

import { IArgs } from '../helpers/IArgs';
import { IHostData, IHosts } from './IHosts';

export const showHostsContent = (hostname: string = null): Promise<IHosts> => {
    return new Promise((resolve, reject) => {
        fs.readFile('./src/config/hosts.json', 'utf-8', (err, data): void => {
            if (err) {
                reject(err.toString());
            }
            if (hostname) {
                const listOfHosts: IHosts = JSON.parse(data);
                const hostData: IHosts = { [hostname]: listOfHosts[hostname] }; // {"kvm10": {ip, login, password}}
                resolve(hostData);
            }
            resolve(JSON.parse(data));
        });
    });
};

const isIHosts = (args: IArgs | IHosts): boolean => {
    if (args.hasOwnProperty('host')) {
        return false;
    }
    return true;
};

export const createDataToAdd = (args: IArgs | IHosts): IHostData => {
    let ip: string;
    let login: string;
    let password: string;

    if (isIHosts(args)) {
        const hostName: string = Object.keys(args)[0];
        ({ ip, login, password } = args[hostName]);
    } else {
        ({ ip, login, password } = args);
    }

    const readyObject: IHostData = {};

    if (ip) {
        readyObject.ip = ip;
    }
    if (login) {
        readyObject.login = login;
    }
    if (password) {
        readyObject.password = password;
    }

    return readyObject; // { ip: ip, login: login, password: password }
};

export const handleJSONFile = async (command: string, args: IArgs): Promise<Map<string, IHostData>> => {
    let hostFile: IHosts;
    let mapHostFile: Map<string, IHostData>;
    let newHostToAdd: IHostData;

    try {
        hostFile = await showHostsContent();
        mapHostFile = Map(hostFile);
        newHostToAdd = createDataToAdd(args);
    } catch (err) {
        console.log(err);
    }

    switch (command) {
        case 'add':
            if (!mapHostFile.has(args.host)) {
                const changedHosts: Map<string, IHostData> = mapHostFile.set(args.host, newHostToAdd);
                return Promise.resolve(changedHosts);
            }
            return Promise.reject('This profile already exists. Try muody update --host=...');

        case 'update':
            if (mapHostFile.has(args.host)) {
                const hostToUpdate: IHosts = await showHostsContent(args.host);
                const dataToUpdate: IHostData = createDataToAdd(hostToUpdate);
                const updatedData: IHostData = Object.assign({}, dataToUpdate, newHostToAdd);
                const changedHosts: Map<string, IHostData> = mapHostFile.set(args.host, updatedData);
                return Promise.resolve(changedHosts);
            }
            return Promise.reject("Can't update profile that doesn't exists.");

        case 'delete':
            if (mapHostFile.has(args.host)) {
                const reducedHosts: Map<string, IHostData> = mapHostFile.delete(args.host);
                return Promise.resolve(reducedHosts);
            }
            return Promise.reject(`Host "${args.host}" doesn't exists!!!.`);
    }
};
