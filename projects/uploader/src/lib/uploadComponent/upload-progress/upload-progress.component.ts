import {takeUntil} from 'rxjs/operators';
import {UploadserviceService} from '../../uploadservice/uploadservice.service';
import {Subject} from 'rxjs';
import {Component, OnInit, Input, TemplateRef, OnDestroy, Output, EventEmitter} from '@angular/core';
import {UploadProgressItem} from '../../uploaded.type';
import * as _ from 'lodash'
@Component({
    selector: '[gjUploadProgress]',
    templateUrl: './upload-progress.component.html',
    styleUrls: ['./upload-progress.component.css']
})
export class UploadProgressComponent implements OnInit, OnDestroy {
    @Input() uploadlist: UploadProgressItem[] = [];
    @Input() uploadType: any;
    @Input() useDefaultProgress = true;
    @Input() showOptionsBtn = true;

    @Input() progressTemplate: TemplateRef<any>;
    @Output() curCount = new EventEmitter();
    @Output() isFinishUpload = new EventEmitter();
    @Input() uploadScroll:boolean = false;
    @Input() uploadScrollSize = 30;
    @Input() uploadWrap = "example-viewport"
    destroy$ = new Subject();

    constructor(
        private uploadservice: UploadserviceService
    ) {
    }

    ngOnInit() {
        this.initUploadlist();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initUploadlist() {
        // 首先把有的都先拉进来
        if (this.uploadservice.uploaderTypeOfTask[this.uploadType]) {
            this.uploadlist = this.uploadservice.uploaderTypeOfTask[this.uploadType];
        }
        // this.uploadlist = this.uploadservice.uploaderTypeOfTask[this.uploadType]

        this.uploadservice.addNewTaskTypeIntoTaskTypeList$
            .pipe(
                takeUntil(
                    this.destroy$
                ),
            )
            .subscribe(
                res => {
                    if(this.uploadScroll){
                        this.uploadlist = _.cloneDeep(this.uploadservice.uploaderTypeOfTask[this.uploadType]);
                    }else{
                        this.uploadlist = this.uploadservice.uploaderTypeOfTask[this.uploadType];
                    }
                    this.curCount.emit(this.uploadlist.length)
                }
            );
        this.uploadservice.addNewTaskTypeIntoTaskHistroyTypeList$
        .pipe(takeUntil(this.destroy$))
        .subscribe(res=>{
            if(this.uploadScroll){
                this.uploadlist = _.cloneDeep(this.uploadservice.uploaderTypeOfTask[this.uploadType])
            }else{
                this.uploadlist = this.uploadservice.uploaderTypeOfTask[this.uploadType]
            }
            
            this.curCount.emit(this.uploadlist.length)
            if(this.uploadlist.length==0){
                this.isFinishUpload.emit()
            }
        })

    }

    cancelTask(data: UploadProgressItem, event: MouseEvent) {
        event.stopPropagation();
        this.uploadservice.cancelTask(data);

    }

    continueTask(data: UploadProgressItem, event: MouseEvent) {
        event.stopPropagation();
        this.uploadservice.continueTask(data);
    }

    pauseTask(data: UploadProgressItem, event: MouseEvent) {

        event.stopPropagation();
        this.uploadservice.pauseTask(data);
    }
}
