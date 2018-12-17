import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {DatabaseService} from '../database.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public addUser:boolean = false;
  public users: Array<IUser>= [];
  arrayLength:number;
  public addUserForm = new FormGroup({
    title: new FormControl('', Validators.required),
    eventColor: new FormControl('', Validators.required),
    //Agenda: new FormControl('')
  });

  constructor( private router: Router, private route: ActivatedRoute, private dbService:DatabaseService) { }

  ngOnInit() {
    var me = this;
    this.dbService.getUsers().then(function(dbUsers){
     for(var i=0;i<dbUsers.length;i++){
      me.users.push(dbUsers[i]);
     }
    })
    
   
  }
  goTo(pad:String):void{
    this.router.navigate(['/'+ pad], { relativeTo: this.route });
  }

public saveUser(){

  this.arrayLength = this.users.length+1;
  let newuser:IUser = {
    id: undefined,
    title: this.addUserForm.get('title').value,
    eventColor: this.addUserForm.get('eventColor').value,
    //Agenda: this.addUserForm.get('Agenda').value
  };
  console.log(newuser);
  this.users.push(newuser);

  this.addUser = !this.addUser;
  this.addUserForm.get('title').setValue("");
  this.addUserForm.get('eventColor').setValue("");
  //this.addUserForm.get('Agenda').setValue("");
  this.dbService.addUser(newuser)
}

public cancel(){
  this.addUser = !this.addUser;
  this.addUserForm.get('title').setValue("");
  this.addUserForm.get('eventColor').setValue("");
  //this.addUserForm.get('Agenda').setValue("");
}
}

export interface IUser{
  id:string;
  title:string;
  eventColor:string;
  //Agenda:string;
}
