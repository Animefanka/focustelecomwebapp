import { Injectable } from '@angular/core';

import {HttpClient,HttpParams} from '@angular/common/http';
import {Call} from './call';

import{Subject,Observable} from 'rxjs';

import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class CallService {


  private apiUrl:string='http://localhost:3000';
  private callId=new Subject<number>();

  private callStatus=new Subject<string>();

  private socket=io('http://localhost:3000');


  checkStatus(){
    const queryParams=new HttpParams().set('id',String(this.callId));
      this.http.get<Call>(this.apiUrl+'/status',{params:queryParams}).subscribe(data=>{
        this.callStatus.next(data.status);
      });
  }



  placeCall(number:string){
    const postData={first_number:'999999999', second_number:number};
      this.http.post<Call>(this.apiUrl+'/call',postData).subscribe(data =>{
        this.callId.next(data.id);
      });
  }

  isFinished(status:string):boolean{
return status==='ANSWERED';
  }

  isConnected(status:string):boolean{
    return status==='CONNECTED';
  }


  getCallId():Observable<number>{
    return this.callId.asObservable();
  }

  getCallStatus():Observable<string>{
    return this.callStatus.asObservable();
  }

  constructor(private http:HttpClient) { 
    this.socket.on('status',(data)=>{
      this.callStatus.next(data.status);
    });
  }

}
