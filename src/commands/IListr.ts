import { ExecaChildProcess } from 'execa';

export interface IListr {
  title: string;
  task: (ctx?: any, task?: any) => Promise<void> | ExecaChildProcess;
  enabled?: (ctx?: any) => boolean;
  skip?: (ctx?: any) => Promise<string>;
}
