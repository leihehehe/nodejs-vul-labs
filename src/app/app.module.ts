import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Lab1Component } from './lab1/lab1.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { DatabaseService } from './database.service';
import { Lab2Component } from './lab2/lab2.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { Lab3Component } from './lab3/lab3.component';
import { Lab4Component } from './lab4/lab4.component';
import { RegisterComponent } from './register/register.component';
const appRoutes:Routes=[
  {path:'home',component:OverviewComponent,canActivate:[AuthGuardService]},
  {path:'login',component:LoginComponent},
    {path:'lab1',component:Lab1Component,canActivate:[AuthGuardService]},
    {path:'lab2',component:Lab2Component,canActivate:[AuthGuardService]},
    {path:'lab3',component:Lab3Component,canActivate:[AuthGuardService]},
    {path:'lab4',component:Lab4Component,canActivate:[AuthGuardService]},
    {path:'',redirectTo:"/home",pathMatch:"full"}
];

@NgModule({
  declarations: [
    AppComponent,
    Lab1Component,
    OverviewComponent,
    Lab2Component,
    LoginComponent,
    Lab3Component,
    Lab4Component,
    RegisterComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes,{useHash:true}),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
