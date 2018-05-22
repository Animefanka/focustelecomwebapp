import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  number:string;
  validator = /(^[0-9]{9}$)/;

  call(){
    if(this.isValidNumber()){
      this.router.navigate(['/ringing/'+this.number]);
    }
  }

  isValidNumber(){
    return this.validator.test(this.number);
  }

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
