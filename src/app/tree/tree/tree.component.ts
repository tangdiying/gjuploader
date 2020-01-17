import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import * as _ from 'lodash'
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  dragged = null;
  @ViewChild("areaRight",{static:true}) areaRight:ElementRef;
  constructor() { }

  ngOnInit() {
    // console.log(this.areaRight)
    // fromEvent(this.areaRight.nativeElement,"drop")
    // .subscribe(e=>{
    //   console.log(e)
    // })
    // fromEvent(this.areaRight.nativeElement,"dropover")
    // .subscribe(e=>{
    //   console.log(e)
    // })
  }
  drop(e){
    console.log(e,"drop")
    console.log(e.target)
    // e.target.parentNode.insertBefore(this.dragged,e.target)
    console.log(this.dragged)
    // this.dragged.parentNode.removeChild(this.dragged)
    e.stopPropagation();
  }
  dropover(e){
    // console.log(e,"over")
    e.preventDefault()
  }
  drag(e){
    // console.log(e)
  }
  dragstart(e,i){
    console.log(e,"start")
    this.dragged = e.target.cloneNode(true)
    console.log(e.target)
  }
}
