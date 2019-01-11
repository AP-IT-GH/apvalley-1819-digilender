import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database.service';
import { ThrowStmt } from '@angular/compiler';
import { MatSnackBar } from '@angular/material'
import { authService } from '../auth.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public addUser: boolean = false;
  public users: Array<IUser> = [];
  public colors: Array<string> = [];
  public chosenColor: string;
  public selected: number;
  public changeUser: IUser;
  public snackbar;
  arrayLength: number;


  public addUserForm = new FormGroup({
    title: new FormControl('', Validators.required),
    //eventColor: new FormControl('', Validators.required),
    //Agenda: new FormControl('')
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    public snackBar: MatSnackBar,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon("google-calendar", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/logo/google-calendar.svg"));
    this.matIconRegistry.addSvgIcon('google-logo', this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/logo/google-logo.svg"))
  }

  ngOnInit() {
    var me = this;
    this.dbService.getUsers().then(function (dbUsers) {
      for (var i = 0; i < dbUsers.length; i++) {
        me.users.push(dbUsers[i]);
      }
    })

    this.colorsToChoose();

  }

  public goTo(pad: String): void {
    this.router.navigate(['/' + pad], { relativeTo: this.route });
  }

  public saveUser() {

    this.arrayLength = this.users.length + 1;
    let newuser: IUser = {
      id: undefined,
      title: this.addUserForm.get('title').value,
      eventColor: this.chosenColor,
      //Agenda: this.addUserForm.get('Agenda').value
    };
    if (newuser.title != "" && newuser != null) {
      console.log(newuser);
      this.users.push(newuser);
      this.dbService.addUser(newuser);

      newuser = null;
      this.addUserForm.get('title').setValue("");
      //this.addUserForm.get('Agenda').setValue("");

      this.snackBar.open('Nieuwe gebruiker toegevoegd', 'close', { duration: 3000 });
    }

    this.addUser = false;

  }

  public updateUser(user: IUser) {
    this.users[this.users.indexOf(user)].eventColor = this.chosenColor;
    this.dbService.addUser(user);
    this.snackBar.open('Kleur gebruiker aangepast', 'close', { duration: 3000 });

  }

  public selectedColor(color: string, i: number) {
    this.chosenColor = color;
    this.selected = i;
  }


  public userToUpdate(id: string) {
    this.addUser = false;
    this.users.forEach(element => {
      if (element.id == id) {
        this.changeUser = element;
      }
    });
  }


  public deleteUser(id: string) {
    this.dbService.deleteUser(id);
    this.users.forEach(element => {
      if (element.id == id)
        this.users.splice(this.users.indexOf(element), 1);
    });
  }


  private colorsToChoose() {
    this.colors.push("#F47E44");
    this.colors.push("#FACA13");
    this.colors.push("#F4F1EA");
    this.colors.push("#2495D3");
    this.colors.push("#FAAE83");
    this.colors.push("#9EC3E7");
  }
}

export interface IUser {
  id: string;
  title: string;
  eventColor: string;
  //Agenda:string;
}
