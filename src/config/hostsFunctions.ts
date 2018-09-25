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

export const createDataToAdd = (args: IArgs): IHostData => {
    const { ip, login, password } = args;

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
    const { host } = args;

    try {
        hostFile = await showHostsContent();
        mapHostFile = Map(hostFile);
        newHostToAdd = createDataToAdd(args);
    } catch (err) {
        console.log(err);
    }

    switch (command) {
        case 'add':
            if (!mapHostFile.has(host)) {
                const changedHosts: Map<string, IHostData> = mapHostFile.set(host, newHostToAdd);
                return Promise.resolve(changedHosts);
            }
            return Promise.reject('This profile already exists. Try muody update --host=...');

        case 'update':
            if (mapHostFile.has(host)) {
                const updatedData: IHostData = Object.assign({}, hostFile[host], newHostToAdd);
                const changedHosts: Map<string, IHostData> = mapHostFile.set(host, updatedData);
                return Promise.resolve(changedHosts);
            }
            return Promise.reject("Can't update profile that doesn't exists.");

        case 'delete':
            if (mapHostFile.has(host)) {
                const reducedHosts: Map<string, IHostData> = mapHostFile.delete(host);
                return Promise.resolve(reducedHosts);
            }
            return Promise.reject(`Host "${host}" doesn't exists!!!.`);
    }
};
