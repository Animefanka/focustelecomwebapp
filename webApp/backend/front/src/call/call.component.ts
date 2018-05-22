import { Component, OnInit } from '@angular/core';

import { CallService } from './../app/call.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {
  minutes;
  seconds;
  interval;


  constructor(private router: Router, private callService: CallService) { }

  ngOnInit() {
    this.callService.getCallStatus().subscribe(status => {
      if (this.callService.isFinished(status)) {
        this.router.navigate(['/finished']);
      }
    });



    this.minutes = 0;
    this.seconds = 0;
    this.interval = setInterval(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;
      }
  }, 1000);

}

}
