import { Injectable, Inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class LalaService {

  constructor(private apiUrl:string,private msg:NzMessageService) {
    console.log(this.apiUrl)
  }
  test( ) {
    console.log(this.apiUrl,this.msg)
  }
}
