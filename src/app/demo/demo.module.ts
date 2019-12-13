import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';


import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UploaderModule } from 'gjuploader';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    UploaderModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    NgZorroAntdModule,
    HttpClientModule
  ],
  exports:[PlayerComponent]
})
export class DemoModule { }
