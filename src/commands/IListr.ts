export interface IListr {
  title: string;
  task: (ctx?: any, task?: any) => Promise<void>;
  enabled: (ctx?: any) => boolean;
  skip: (ctx?: any) => Promise<string>;
}

type ITask = (ctx: any, task: any) => void;

type IEnabled = (ctx: any) => boolean;
