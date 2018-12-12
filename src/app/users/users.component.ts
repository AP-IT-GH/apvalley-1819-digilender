import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public addUser:boolean = false;
  public users: Array<IUser>= [];
  public addUserForm = new FormGroup({
    Naam: new FormControl('', Validators.required),
    Kleur: new FormControl('', Validators.required),
    Agenda: new FormControl('')
  });

  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }
  goTo(pad:String):void{
    this.router.navigate(['/'+ pad], { relativeTo: this.route });
  }

public saveUser(){
  /*console.log(this.addUserForm.get('Naam').value);
  console.log(this.addUserForm.get('Kleur').value);
  console.log(this.addUserForm.get('Agenda').value);*/
  let newuser:IUser = {
    Naam: this.addUserForm.get('Naam').value,
    Kleur: this.addUserForm.get('Kleur').value,
    Agenda: this.addUserForm.get('Agenda').value};
  console.log(newuser);
  this.users.push(newuser);

  this.addUser = !this.addUser;
  this.addUserForm.get('Naam').setValue("");
  this.addUserForm.get('Kleur').setValue("");
  this.addUserForm.get('Agenda').setValue("");
}

public cancel(){
  this.addUser = !this.addUser;
  this.addUserForm.get('Naam').setValue("");
  this.addUserForm.get('Kleur').setValue("");
  this.addUserForm.get('Agenda').setValue("");
}
}

export interface IUser{
  Naam:string;
  Kleur:string;
  Agenda:string;
}
