import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-lab1',
  templateUrl: './lab1.component.html',
  styleUrls: ['./lab1.component.css']
})

export class Lab1Component implements OnInit {
  socket: any;
  message: String="";
  username:String="";
  constructor(private authService:AuthService, private router: Router) {
    //this.authService.getUserName();
    }
  phoneNumber:String="";
  status:any[]=[];//this is to show the status of the phone bomber
  tip=false;
  ngOnInit(): void {
    this.socket = io();
    this.listenOnStatus()
    this.authService.getUserName();
  }
  phoneBomb(){
    if(this.phoneNumber==""){
      this.status.push('Please input your target phone number')
    }
    else if(!isNaN(Number(this.phoneNumber))){
      this.socket.emit('lab1',this.phoneNumber);
    }else{
      this.status.push('Your target phone number is incorrect!')
    }
  }
  listenOnStatus(){

      this.socket.on('bombStatus',(data:any) =>{
        this.status.push(data);
      });
    
  }
  showTip(){
    if(this.tip) this.tip=false;
    else this.tip=true;
  }
 
}
