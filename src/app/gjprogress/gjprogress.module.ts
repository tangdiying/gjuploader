import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GjprogressComponent } from './gjprogress/gjprogress.component';
import { GjbarComponent } from './gjbar/gjbar.component';
import { GjplayerComponent } from './gjplayer/gjplayer.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [GjprogressComponent, GjbarComponent, GjplayerComponent],
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  exports:[GjbarComponent,GjprogressComponent]
})
export class GjprogressModule { }
