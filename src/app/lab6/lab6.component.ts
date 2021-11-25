import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-lab6',
  templateUrl: './lab6.component.html',
  styleUrls: ['./lab6.component.css']
})
export class Lab6Component implements OnInit {

  constructor(private authService:AuthService) { }

  username:String="";
code:String=`
app.get('/lab6',function(req,res){
  if(req.url.match(/7B|7D|2C|\,/ig)){
    res.send("回答错误！");
  }else{
    if(req.query.ck.name==='admin'&&req.query.ck.anwser==='niceGame'){
      res.send(flag);
    }else{
      res.send("回答错误！");
    }
  }
})`;
  tip=false;
  ngOnInit(): void {
    this.username=this.authService.getUserName();
  }


  showTip(){
    if(this.tip) this.tip=false;
    else this.tip=true;
  }


}
