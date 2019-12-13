import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {UploadTypeOfTaskList, UploadProgressItem} from '../uploaded.type';
import {Subject} from 'rxjs';
import * as _ from 'lodash';
import jsSHA from 'jssha'
import Resumable from 'uploadguangji';


// @Injectable({
//     providedIn: 'root'
// })
export class UploadserviceService implements OnDestroy{
    uploader: Resumable;
    uploaderTypeOfTask: UploadTypeOfTaskList = {};
    uploadTaskList: UploadProgressItem[] = [];

    uploaderTypeOfHistroy: UploadTypeOfTaskList = {};
    uploadHistroyList: Array<UploadProgressItem> = [];

    autoUpload = true;

    readyToSendMergeFilePost$ = new Subject();
    addNewTaskTypeIntoTaskTypeList$ = new Subject();
    addNewTaskTypeIntoTaskHistroyTypeList$ = new Subject();
    pushWhenListFinished$ = new Subject();
    
    constructor(public config) {
        this.setConfig(config)
        this.initUploaderInstance(config);
    }

    ngOnDestroy(): void {
    }

    setConfig(config){
        for(let key in config){
            if(!config[key]){
                _.unset(config,key)
            }
        }
    }
    initUploaderInstance(config): void {
        this.uploader = new Resumable({
            target: config.uploadurl,
            testTarget:config.testTarget,
            maxChunkRetries: 4,
            testChunks: true,
            testMethod:'POST',
            forceChunkSize: true,
            headers:config.headers,
            generateUniqueIdentifier: function(file): string {
                const t = Math.round(Number(new Date()));
                let shaObj = new jsSHA("SHA-1", "TEXT");
                shaObj.update(t);
                shaObj.update(file.name);
                let hash = shaObj.getHash("HEX");
                return hash
            },
            query:function(){
                return {create_time:new Date()}
            }
        });
        this.handleFilesAdded();
        this.updateProgressInfo();
        this.handleFileSuccessed();

    }

    handleAddNewUploadTask(list: File[], type: string): void {
        // 先添加入uploader实例中
        this.uploader.addFiles(this.addTypeToFileTask(list, type));
    }

    addTypeToFileTask(list: File[], type: string) {
        for (let i = 0; i < list.length; i++) {
            let t = new Date();
            list[i]['uploadType'] = type;
            list[i]['create_time'] = t
        }
        return list;
        
    }

    handleFilesAdded(): void {
        this.uploader.on('filesAdded', (arrayAdded, arraySkipped) => {
            //
            this.updateTasklist(arrayAdded);

            if (this.autoUpload) {
                //允许自动上传
                this.uploader.upload();
            }

        });

    }

    updateTasklist(list): void {
        // 更新tasklist前  先看看typeoftasklist中有没有该type的tasklist  没有再新建 再加入typeoftasklist
        const target = [];

        list.forEach(item => {
            //console.log(item);
            const obj = {
                uid: item.uniqueIdentifier,
                name: item.fileName,
                progress: 0,
                size: item.size,
                isFinished: false,
                isPause: false,
                type: item.file.uploadType,
            };


            const t = _.has(this.uploaderTypeOfTask, obj.type);
            if (t) {
                this.uploaderTypeOfTask[obj.type].push(obj);
            } else {
                target.push(obj);
            }
        });
        // target中全是之前uploadertypeoftask中不存在的类型
        if (target.length > 0) {
            this.uploaderTypeOfTask[target[0].type] = target;
        }
        this.addNewTaskTypeIntoTaskTypeList$.next();
    }

    updateProgressInfo(): void {
        this.uploader.on('fileProgress', (file) => {
            const task = _.find(this.uploaderTypeOfTask[file.file['uploadType']], {uid: file.uniqueIdentifier});

            if (task) {
                task.progress = Number(file.progress(false).toFixed(1)) * 100;
            }

        });
    }

    handleFileSuccessed(): void {
        this.uploader.on('fileSuccess', (file) => {
            this.readyToSendMergeFilePost$.next(file);
        });
    }

    updateFinishStateOfFile(file) {
        const task = _.remove(this.uploaderTypeOfTask[file.file['uploadType']], {uid: file.uniqueIdentifier})[0];
        if(this.uploaderTypeOfTask[file.file['uploadType']].length==0){
            // this.msg.success("上传完成！！！")
        }
        if (!task) {
            return false;
        }
        task.isFinished = true;


        // 更新完finish状态 应该把该条记录从tasklist中移除  加入上传历史中
        if (this.uploaderTypeOfHistroy[task.type]) {
            this.uploaderTypeOfHistroy[task.type].push(task);
        } else {
            const arr: UploadProgressItem[] = [];
            arr.push(task);

            this.uploaderTypeOfHistroy[task.type] = arr;
        }

        // 检查一下该队列中是否还有任务 如果有任务 则略过 如果没有 则释放完成队列任务信息
        // console.log(this.uploaderTypeOfHistroy[task.type].length)

        // 将完成的任务加入相应的历史任务队列中
        this.addNewTaskTypeIntoTaskHistroyTypeList$.next();
        // this.uploadHistroyList.push(task)

    }

    cancelTask(data: UploadProgressItem) {
        const task: any = this.uploader.getFromUniqueIdentifier(data.uid);
        console.log(this.uploaderTypeOfTask)
        _.remove(this.uploaderTypeOfTask[task.file['uploadType']], {uid: task.uniqueIdentifier})[0];
        this.addNewTaskTypeIntoTaskTypeList$.next();
        task.cancel();
    }

    pauseTask(data) {
        data.isPause = true;
        const task: any = this.uploader.getFromUniqueIdentifier(data.uid);
        task.pause();


    }

    continueTask(data) {
        data.isPause = false;
        const task: any = this.uploader.getFromUniqueIdentifier(data.uid);
        task.pause();
        this.uploader.upload();

    }
    removeResumable(){
        this.uploader = null;
    }
    isFinished(){
        let flag = this.uploader.isUploading()
        return flag;
    }
}
