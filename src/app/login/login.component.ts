import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String ="";
  password:String ="";
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.getUserName();

  }

  login(){
    this.authService.login(this.username,this.password).subscribe((response:any) => {
      this.authService.setUserInfo({'user':response.user})
      this.authService.getUserName();
      this.router.navigate(['home'])
    })
  }

}
