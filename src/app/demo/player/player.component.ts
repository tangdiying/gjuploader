import { Component, OnInit } from '@angular/core';
import { UploadserviceService } from 'gjuploader';
import { HttpClient } from '@angular/common/http';
import { JsonToFormdata } from './myutil';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  uploaderservice;
  historyCount = 0;
    currentCount = 0;
  isUpload:boolean = false;
  constructor(private http:HttpClient) {
    this.uploaderservice = new UploadserviceService('http://192.168.50.128:30003/filesystem/fileload/')
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

  test(file) {
      //console.log($event);
      const obj = {
        hashid: file.uniqueIdentifier,
        totalchunk: file.chunks.length,
        name: file.fileName,
        type: file.file.type,
        folderId: 42
    };
    this.http.post('http://192.168.50.128:30003'+'/filesystem/fileupload/', JsonToFormdata(obj))
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
