import { Component, OnInit } from '@angular/core';

import { io } from 'socket.io-client';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-lab3',
  templateUrl: './lab3.component.html',
  styleUrls: ['./lab3.component.css']
})
export class Lab3Component implements OnInit {
socket: any;
content:String="";
username:String="";

tip=false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.username=this.authService.getUserName();
    this.socket = io();
    this.listenOnStatus();
    this.socket.emit("lab3","content");
  }
  listenOnStatus(){
    this.socket.on('announcement',(data:any) =>{
      this.content=data;
    });
  }
  showTip(){
    if(this.tip) this.tip=false;
    else this.tip=true;
  }

}
