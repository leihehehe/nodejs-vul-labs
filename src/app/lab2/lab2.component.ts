import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { io } from 'socket.io-client';
@Component({
  selector: 'app-lab2',
  templateUrl: './lab2.component.html',
  styleUrls: ['./lab2.component.css']
})
export class Lab2Component implements OnInit {
  constructor(private authService:AuthService) { }
  vipCode:String=""
  status:any[]=[]
  username:String="";
  socket:any;
  tip=false;
  ngOnInit(): void {
    this.username=this.authService.getUserName();
    this.socket = io();
    this.listenOnStatus()
  }
  unlock(){  
    this.socket.emit('unlock',{username:this.username,vipCode:this.vipCode});
  };
  viewSecret(){
    
    this.socket.emit('checkVIP',localStorage.getItem('userInfo'));
}
  showTip(){
    if(this.tip) this.tip=false;
    else this.tip=true;
  }

  listenOnStatus(){
    this.socket.on('vipContent',(data:any) =>{
      if(data.Event!=null) this.status.push(data.Event)
      else this.status.push(data);
    });
  }

}