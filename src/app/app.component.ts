import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nodejsLabs';
  username='';
  
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit() {

    this.authService.currenUsername.subscribe(username =>this.username=username);
  }
  logout(){
    this.authService.logout().subscribe((response:any) => {
      this.authService.removeUserInfo();
      this.router.navigate(['login'])
    })

  }
}
