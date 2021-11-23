import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-lab4',
  templateUrl: './lab4.component.html',
  styleUrls: ['./lab4.component.css']
})
export class Lab4Component implements OnInit {
  socket: any;
  content:String="";
  username:String="";
  tip=false;
  ticket=0;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    
    this.username=this.authService.getUserName();
    this.socket = io();
    this.listenOnStatus();
    let tk=this.authService.getTicket()
    if(tk!=null){
      this.ticket=Number(tk);
    }
  }
  listenOnStatus(){
    this.socket.on('results',(data:any) =>{
      this.content=data;
    });
  }

  vote(target:String){

    let tk=this.authService.getTicket()
    if(tk!=null){
      this.ticket=Number(tk);
    }
    this.ticket--;
    this.authService.setTicket(this.ticket.toString());
    this.socket.emit("lab4",{username:target,ticket:1});
    
  }

  showTip(){
    if(this.tip) this.tip=false;
    else this.tip=true;
  }


}
