export interface IHosts {
    [key: string]: IHostData;
}
export interface IHostData {
    ip: string;
    login?: string;
    password?: string;
}
