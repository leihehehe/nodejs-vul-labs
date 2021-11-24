import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-lab5',
  templateUrl: './lab5.component.html',
  styleUrls: ['./lab5.component.css']
})
export class Lab5Component implements OnInit {

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
    this.socket.emit('unlockLab5',{username:this.username,vipCode:this.vipCode});
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
