import { Component, OnInit } from '@angular/core';

import {CallService} from './../call.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ringing',
  templateUrl: './ringing.component.html',
  styleUrls: ['./ringing.component.css']
})
export class RingingComponent implements OnInit {
  timeLeft;
  interval;

  constructor(private router:Router,private route:ActivatedRoute,private callService:CallService) { }

  ngOnInit() {
    let number = null;
    this.route.params.subscribe(params=>{number=params.number});
    this.callService.placeCall(number);

    this.callService.getCallStatus().subscribe(status=>{
      if(status==="FAILED"){
        this.router.navigate(['/failed']);
      }
      if(this.callService.isConnected(status)){
        this.router.navigate(['/call']);
      }
    });

    this.timeLeft=26;
    this.interval=setInterval(()=>{
      this.timeLeft--;
      if(this.timeLeft==0){
        clearInterval(this.interval);
      }
    },1000);

  }
 


}


