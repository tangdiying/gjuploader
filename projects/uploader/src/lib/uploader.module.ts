import { NgModule } from '@angular/core';
import { UploaderDirectiveDirective } from './uploader-directive.directive';
import { UploadProgressComponent } from './uploadComponent/upload-progress/upload-progress.component';
import { UploadHistroyComponent } from './uploadComponent/upload-histroy/upload-histroy.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadserviceService } from './uploadservice/uploadservice.service';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { UploadTotalProgressComponent } from './uploadComponent/upload-total-progress/upload-total-progress.component';

@NgModule({
  declarations: [
    UploaderDirectiveDirective,
    UploadProgressComponent,
    UploadHistroyComponent,
    UploadTotalProgressComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    MatProgressBarModule,
    ScrollDispatchModule
  ],
  providers:[],
  exports: [
    UploaderDirectiveDirective,
    UploadProgressComponent,
    UploadHistroyComponent,
    UploadTotalProgressComponent
  ]
})
export class UploaderModule { }
