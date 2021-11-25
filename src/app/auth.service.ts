import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public availableTickets={};

  private username = new BehaviorSubject('You havn\'t logged in yet');
  public currenUsername=this.username.asObservable();
  constructor(private http:HttpClient) {
   }
   public validate(){
    return this.http.get('/authenticate');
  }
  public  isAuthenticated(){
      let userData = localStorage.getItem('userInfo');
      if(userData &&JSON.parse(userData)){
        return true;
      }
      return false;
  }


  public setUserInfo(user:any){
    localStorage.setItem('userInfo', JSON.stringify(user));
    this.setTicket("2");
  }
  public removeUserInfo(){
    localStorage.removeItem('userInfo');
  }


  public login(username:String, password:String) {
    return this.http.post('/login', {'username' : username, 'password' : password},httpOptions)
  }

  public logout(){
    return this.http.get('/logout');
  }
  public register(username:String, password:String){
    return this.http.post('/signup', {'username' : username, 'password' : password},httpOptions)
  }

  public getTicket(){
    return localStorage.getItem('ticket');
  }
  public setTicket(currentTick:string){
    localStorage.setItem('ticket',currentTick);
  }

  getUserName(notLoggedIn="You haven\'t logged in yet"):String{
    let us = localStorage.getItem('userInfo');

    if(us!=null){
      this.username.next(JSON.parse(us).user.username);
      return JSON.parse(us).user.username;
    }else{
      this.username.next(notLoggedIn);
      return notLoggedIn;
    }
  }
  
 

}
