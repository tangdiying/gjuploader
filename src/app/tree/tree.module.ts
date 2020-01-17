import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree/tree.component';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [TreeComponent],
  imports: [
    CommonModule,
    ScrollDispatchModule
  ],
  exports:[TreeComponent]
})
export class TreeModule { }
