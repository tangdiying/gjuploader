import { Component, OnInit, Input, Output, EventEmitter, ElementRef, OnChanges, ViewChild, OnDestroy } from '@angular/core';
import { fromEvent, Subject, pipe } from 'rxjs';
import { takeLast, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gjbar',
  templateUrl: './gjbar.component.html',
  styleUrls: ['./gjbar.component.css']
})
export class GjbarComponent implements OnInit,OnChanges,OnDestroy {
  ngOnDestroy(): void {
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(changes.gjValue){
      this.barleft = (this.scroll.nativeElement['offsetWidth']-this.bar.nativeElement['offsetWidth'])*this.gjValue/this.allValue;
    }
  }
  @ViewChild("scroll",{static:true}) scroll:ElementRef
  @ViewChild("bar",{static:true}) bar
  @ViewChild("mask",{static:true}) mask
  @Input() gjValue = 50;
  @Input() allValue = 100;
  @Output() gjValueChange = new EventEmitter()
  @Output() gjProgressBarMouseDown = new EventEmitter()
  @Output() gjProgressBarMouseUp = new EventEmitter()
  @Output() gjProgressBarClick= new EventEmitter()
  @Output() gjProgressBarValue = new EventEmitter()
  leftval = 0;
  barleft = 0;
  destory$ = new Subject();
  constructor() { }

  ngOnInit() {
    this.getOffsetSum()
    this.barleft = Math.round(this.gjValue*(this.scroll.nativeElement['offsetWidth']-this.bar.nativeElement['offsetWidth'])/this.allValue)
  }
  mousedown(e){
    this.gjProgressBarMouseDown.emit()
    this.leftval = e['clientX'] - e['target']['offsetLeft']
    console.log("111111111111")
    fromEvent(document,"mousemove")
    .pipe(takeUntil(this.destory$))
    .subscribe(e=>{
      this.barleft = e['clientX']-this.leftval;
      if(this.barleft<0){
        this.barleft = 0;
      }
      if(this.barleft>this.scroll.nativeElement['offsetWidth']-this.bar.nativeElement['offsetWidth']){
        this.barleft = this.scroll.nativeElement['offsetWidth']-this.bar.nativeElement['offsetWidth']
      }
      this.gjValue = Math.round(this.barleft/(this.scroll.nativeElement['offsetWidth']-this.bar.nativeElement['offsetWidth'])*this.allValue)
      this.gjValueChange.emit(this.gjValue);
      this.gjProgressBarValue.emit(this.gjValue)
    })
    fromEvent(document,"mouseup")
    .subscribe(e=>{
      this.destory$.next()
      this.gjProgressBarMouseUp.emit(this.gjValue)
      this.gjValueChange.emit(this.gjValue)
    })
  }
  barClick(e){
    let left = this.getOffsetSum()
    this.barleft = e['pageX'] - left -this.bar.nativeElement.clientWidth/2;
    this.gjValue = Math.round(this.allValue*this.barleft/(this.scroll.nativeElement['offsetWidth']-this.bar.nativeElement['offsetWidth']))
    this.gjProgressBarClick.emit(this.gjValue)
    this.gjValueChange.emit(this.gjValue)
  }
  getOffsetSum(){
    let ele = this.scroll.nativeElement
    var top= 0,left=0;
    while(ele){
      top+=ele.offsetTop;
      left+=ele.offsetLeft;
      ele=ele.offsetParent;
    }
    return left
  }
}
