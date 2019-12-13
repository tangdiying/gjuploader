import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gjprogress',
  templateUrl: './gjprogress.component.html',
  styleUrls: ['./gjprogress.component.css']
})
export class GjprogressComponent implements OnInit {
  @Input() gjValue = 0;
  
  constructor() { }

  ngOnInit() {
  }

}
