import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-initialization',
  templateUrl: './initialization.component.html',
  styleUrls: ['./initialization.component.css']
})
export class InitializationComponent implements OnInit {

  constructor(private database: DatabaseService) { }
  result="";
  ngOnInit(): void {
  }
  initial(){
    this.database.initial().subscribe((response:any)=>{
      this.result=response.msg;
    });
  }

}
