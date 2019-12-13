import {
  Component,
  OnInit,
  Input,
  OnDestroy
} from '@angular/core';
import {
  Subject
} from 'rxjs';
import {
  takeUntil
} from 'rxjs/operators';
import * as _ from 'lodash'
@Component({
  selector: 'gj-upload-total-progress',
  templateUrl: './upload-total-progress.component.html',
  styleUrls: ['./upload-total-progress.component.css']
})
export class UploadTotalProgressComponent implements OnInit, OnDestroy {

  @Input() uploadservice;
  speed = 0;
  uploadlist;
  uploadlistfirst;
  uploadHistroyList;
  @Input() uploadType: any;
  destroy$ = new Subject();
  constructor() {}

  ngOnInit() {
    this.initUploadlist()
  }
  ngOnDestroy(): void {

  }
  initUploadlist() {
    if (this.uploadservice.uploaderTypeOfTask[this.uploadType]) {
      this.uploadlistfirst = this.uploadservice.uploaderTypeOfTask[this.uploadType];
      this.uploadlist = []
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
        this.uploadlistfirst = _.cloneDeep(this.uploadservice.uploaderTypeOfTask[this.uploadType]);
      }
    );
    this.uploadservice.addNewTaskTypeIntoTaskHistroyTypeList$
        .pipe(takeUntil(this.destroy$))
        .subscribe(res=>{
            this.uploadlist = _.cloneDeep(this.uploadservice.uploaderTypeOfTask[this.uploadType])
            this.speed = Number(((this.uploadlistfirst.length-this.uploadlist.length)/this.uploadlistfirst.length).toFixed(1))*100
        })
  }
}
