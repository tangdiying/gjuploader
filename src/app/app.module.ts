import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadModule } from 'ng2-file-upload';
import {NgZorroAntdModule} from 'ng-zorro-antd';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UploaderModule, UploadserviceService } from 'projects/uploader/src/public-api';
import { DemoModule } from './demo/demo.module';
import { GjprogressModule } from './gjprogress/gjprogress.module';
import { GruopDirective } from './gruop.directive';

@NgModule({
  declarations: [
    AppComponent,
    GruopDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    NgZorroAntdModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    UploaderModule,
    HttpClientModule,
    DemoModule,
    GjprogressModule
  ],
  providers: [
    // {
    //   provide:UploadserviceService,
    //   useFactory:()=>{
    //     return new UploadserviceService('http://192.168.50.128:30003/filesystem/fileload/')
    //   },
    //   deps:[]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
