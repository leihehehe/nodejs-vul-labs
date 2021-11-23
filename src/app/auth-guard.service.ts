import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService,private route:Router) { }

   canActivate(){
    if(this.authService.isAuthenticated()){
      return true;
    }
    this.route.navigate(['/login']);
    return false;
  }
}
