import {UploadserviceService} from './../../uploadservice/uploadservice.service';
import {Component, OnInit, Input, OnDestroy, Output, EventEmitter} from '@angular/core';
import {UploadProgressItem} from '../../uploaded.type';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as _ from 'lodash'
@Component({
    selector: 'gj-upload-histroy',
    templateUrl: './upload-histroy.component.html',
    styleUrls: ['./upload-histroy.component.css']
})
export class UploadHistroyComponent implements OnInit, OnDestroy {
    uploadHistroyList: Array<UploadProgressItem> = [];

    @Input() isClearAll = false;
    @Input() uploadType: string;
    @Output() uploadCount = new EventEmitter()
    @Input() uploadScroll:boolean = false;
    @Input() uploadScrollSize = 30;
    @Input() uploadWrap = "example-viewport1"
    destroy$ = new Subject();

    constructor(
        private uploadservice: UploadserviceService
    ) {
    }

    ngOnInit() {
        this.initUploadHistroylist();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initUploadHistroylist() {
        if (this.uploadservice.uploaderTypeOfHistroy[this.uploadType]) {
            if(this.uploadScroll){
                this.uploadHistroyList = _.cloneDeep(this.uploadservice.uploaderTypeOfHistroy[this.uploadType]);
            }else{
                this.uploadHistroyList = this.uploadservice.uploaderTypeOfHistroy[this.uploadType];
            }
            
        }
        this.uploadservice.addNewTaskTypeIntoTaskHistroyTypeList$
            .pipe(
                takeUntil(
                    this.destroy$
                )
            )
            .subscribe(
                res => {
                    if(this.uploadScroll){
                        this.uploadHistroyList = _.cloneDeep(this.uploadservice.uploaderTypeOfHistroy[this.uploadType]);
                    }else{
                        this.uploadHistroyList = this.uploadservice.uploaderTypeOfHistroy[this.uploadType];
                    }
                    this.uploadCount.emit(this.uploadHistroyList.length)
                }
            );
    }
}
