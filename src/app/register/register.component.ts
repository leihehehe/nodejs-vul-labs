import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username:String ="";
  password:String ="";
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authService.getUserName();
  }
  register(){
    this.authService.register(this.username,this.password).subscribe((response:any) => {
      this.router.navigate(['login'])
    })
  }
}
