import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gjplayer',
  templateUrl: './gjplayer.component.html',
  styleUrls: ['./gjplayer.component.css']
})
export class GjplayerComponent implements OnInit {
  @Input() gjValue = 0;
  @Output() gjValueChange = new EventEmitter()
  @Input() gjnextValue = 1;
  @Input() gjforwardValue = 10;
  @Input() gjfastforwardValue = 100;
  @Input() gjfastbackwardValue = 0;
  @Input() gjbackwardValue = -10;
  @Input() gjbackValue = -1;
  constructor() { }

  ngOnInit() {
  }
  player(){

  }
  next(){
    this.gjValue = this.gjValue + this.gjnextValue;
    this.gjValueChange.emit(this.gjValue)
  }
  forward(){
    debugger
    this.gjValue = this.gjValue + this.gjforwardValue;
    this.gjValueChange.emit(this.gjValue)
  }
  fastforward(){
    this.gjValue = this.gjfastforwardValue;
    this.gjValueChange.emit(this.gjValue)
  }
  fastbackward(){
    this.gjValue = this.gjfastbackwardValue;
    this.gjValueChange.emit(this.gjValue)
  }
  backward(){
    this.gjValue = this.gjValue + this.gjbackwardValue;
    this.gjValueChange.emit(this.gjValue)
  }
  back(){
    this.gjValue = this.gjValue + this.gjbackValue;
    this.gjValueChange.emit(this.gjValue)
  }

}
