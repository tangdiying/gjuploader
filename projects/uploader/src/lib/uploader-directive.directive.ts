import { Directive, Input, Output, ElementRef, Renderer2, EventEmitter, HostListener, ContentChild } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { UploadProgressComponent } from './uploadComponent/upload-progress/upload-progress.component';
import { UploadserviceService } from './uploadservice/uploadservice.service';
import { uploadedCallback } from './uploaded.type';

@Directive({
  selector: '[gjUploaderDirective]'
})
export class UploaderDirectiveDirective {

  uploadInput: HTMLElement;
  destroy$ = new Subject();

  @Input() uploadType: any; //
  @ContentChild(UploadProgressComponent, {static: false}) gjUploadProgress;

  @Input() @Output() readonly doAfterSingleTaskUploaded: EventEmitter<any> | uploadedCallback<any> | string = new EventEmitter<any>();
  @Input() withProgress = true;
  @Input() autoHandleMergeRequest = true;
  @Input() allowDropToUpload = true;

  @Input() getMeWhenListFinished = false;
  @Input() isUseFolder:boolean = false;
  @Input() fileType = []
  @Input() uploaderservice;
  constructor(
      private el: ElementRef,
      private renderer: Renderer2,
    //   private uploaderservice: UploadserviceService
      ) {
  }

  ngOnInit() {
      this.initUploadInput();
      if (this.allowDropToUpload) {
          this.initDropToUploadArea();
      }
      this.handleFileSuccessed();
  }

  ngOnDestroy() {

      this.destroy$.next();
      this.destroy$.complete();
  }

  ngAfterContentInit() {
  }

  initUploadInput() {
      this.uploadInput = this.renderer.createElement('input');

      fromEvent(this.uploadInput, 'change')
          .pipe(
              takeUntil(this.destroy$)
          )
          .subscribe(
              res => {
                  this.handleAddUploadTsk((res.currentTarget as any).files);
              }
          );
      this.renderer.setAttribute(this.uploadInput, 'multiple', 'true');
      this.renderer.setAttribute(this.uploadInput, 'type', 'file');
      if (this.isUseFolder){
          this.renderer.setAttribute(this.uploadInput,'webkitdirectory','');
      }
      this.renderer.setStyle(this.uploadInput, 'display', 'none');
      this.renderer.appendChild(this.el.nativeElement, this.uploadInput);
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
      // 这块是点击之后出发的
      this.uploadInput.click();
  }

  handleAddUploadTsk(filelist: File[]): void {
      let array = [];
      if(this.fileType&&this.fileType.length>0){
        for(let i=0;i<filelist.length;i++){
            for(let j=0;j<this.fileType.length;j++){
                if(filelist[i]['type']==this.fileType[j]||filelist[i]['type'].indexOf(this.fileType[j])>=0){
                    array.push(filelist[i])
                }
            }
        }
      }else{
          array = filelist
      }
      this.uploaderservice.handleAddNewUploadTask(array, this.uploadType);

      this.uploadInput['value'] = '';

  }

  handleFileSuccessed() {
      this.uploaderservice.readyToSendMergeFilePost$
          .pipe(
              takeUntil(this.destroy$),
              filter<any>(
                  res => {
                      if (res.file.uploadType === this.uploadType) {
                          //console.log(res);
                          return true;
                      } else {
                          //console.log(res);
                          return false;
                      }
                  }
              )
          )
          .subscribe(
              (res: any) => {
                  //console.log(res);
                  this.postAfterSingleTaskSuccessed(res);
              }
          );
  }

  postAfterSingleTaskSuccessed(file) {
      // 先处理发送拼接信息
      // debugger;
      if (this.autoHandleMergeRequest) {
          if (this.doAfterSingleTaskUploaded instanceof EventEmitter) {
              // 啥都没传 默认的情况
              this.doAfterSingleTaskUploaded.emit(file);
          } else if (this.doAfterSingleTaskUploaded === 'serviceCallback') {
              // 服务形式才可以
          } else {
              // 胡乱传的情况
          }
      } else {
          if (this.doAfterSingleTaskUploaded instanceof EventEmitter) {
              this.doAfterSingleTaskUploaded.emit(file);
          } else {
              throw new Error('必须手动处理合并切片请求');
          }

      }


      // 需要更新一下uploadtasklist中的该file的finish状态
      if (this.withProgress) {
          this.uploaderservice.updateFinishStateOfFile(file);
      }
  }

  initDropToUploadArea() {
      fromEvent<any>(this.el.nativeElement, 'dragover')
          .pipe(
              takeUntil(this.destroy$)
          )
          .subscribe(
              res => {
                  //console.log(res);
                  this.preventDefaultEvent(res);
              }
          );
      fromEvent<any>(this.el.nativeElement, 'drop')
          .pipe(
              takeUntil(this.destroy$)
          )
          .subscribe(res => {
              this.preventDefaultEvent(res);
              const list = res.dataTransfer.files;
              this.uploaderservice.handleAddNewUploadTask(list, this.uploadType);
          });
  }

  preventDefaultEvent(e) {
      e.preventDefault();
  }
  handleFileType(data){
    
  }

}
