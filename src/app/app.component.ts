import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import Resumable from 'uploadguangji';
import { LalaService } from './lala.service';
import * as _ from 'lodash'
import { HttpClient } from '@angular/common/http';
import { UploadserviceService } from 'projects/uploader/src/public-api';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { config } from 'rxjs';
import { NzFormatEmitEvent } from 'ng-zorro-antd';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    @ViewChild("drop",{static:true}) drop
  @Input() isUpload = false;
    // @ViewChild('uploadHistory', {static: true})
    historyCount = 0;
    currentCount = 0;
    uploaderservice;
    overlayRef:OverlayRef
  protal:TemplatePortal
    constructor(
      private http:HttpClient,
    ) {
    }

    ngOnInit() {
    }

    showModal() {
        this.isUpload = true;
    }

    handleCancel() {
        this.isUpload = false;
    }

    handleOk() {
        this.isUpload = false;
    }

    test(event) {
        console.log(event);
        let data = new  FormData()
        // uniqueIdentifier
        data.append("hashid",event['file']['uniqueIdentifier'])
        data.append("totalchunk",event['chunks']['length'])
        data.append("name",event['file']['name'])
        data.append("type",event['file']['type'])
        data.append("folderId",'10')
        this.http.post("http://workbench.dev.com/filesystem/fileupload/",data)
        .subscribe(res=>{

        })
    }
    uploadCount(count){
        this.historyCount = count;
    }
    curCount(count){
        this.currentCount = count;
    }
  
}
