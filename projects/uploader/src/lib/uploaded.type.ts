export type uploadedCallback<T> = (instance: T) => (false | void | {}) | Promise<false | void | {}>;

export interface UploadProgressItem {
    size: number;
    progress: number;
    uid: string;
    name: string;
    isFinished: boolean;
    isPause: boolean;
    type?: string; //  以后区分任务类型 不用全局展示
}

export interface UploadTypeOfTaskList {
    [ProName: string]: Array<UploadProgressItem>;
}
