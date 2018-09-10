import { default as hosts } from './hosts.json';
import { IHosts } from './IHosts';

export const getHosts = (): IHosts[] => hosts;

export const getHostsList = (): string[] => Object.keys(hosts);
