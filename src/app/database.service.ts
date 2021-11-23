import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }
  //login&signUp Part
  userLogin(data:any){
    return this.http.post('/login',data,httpOptions);
  }
  userSignup(data:any){
    return this.http.post('/signup',data,httpOptions);
  }


  //lab2
  activateVIP(user:any){
    return this.http.post('/activate',user,httpOptions);
  }
  viewVIP(){
    return this.http.get('/checkVIP',httpOptions);
  }
}
