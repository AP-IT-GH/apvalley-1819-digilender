import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database.service';
import { ThrowStmt } from '@angular/compiler';
import { MatSnackBar } from '@angular/material'
import { authService } from '../auth.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { GoogleCalendarService } from "../google-calendar.service";



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
  googleUserName: string;
  googleProfiel: IGoogleProfiel;
  newuser: IUser;
  isGoogleAccount: boolean
  gCalPar: IGCalParameters

  imageAvatar = '../assets/svg/baseline-person.svg'


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
    private domSanitizer: DomSanitizer,
    private authService: authService,
    private gCalService: GoogleCalendarService
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

  googleAuthSignIn() {
    let response: any

    this.authService.login().then(res => {
      response = res

      this.googleProfiel = {
        name: response.additionalUserInfo.profile.given_name,
        profielImgUrl: response.additionalUserInfo.profile.picture,
        googleId: response.additionalUserInfo.profile.id
      }

      this.addUser = true
      this.googleUserName = this.googleProfiel.name
      this.isGoogleAccount = true

      console.log(response.credential.accessToken)
       this.addEventFromGoogleCalendar(response.credential.accessToken)
    })
  }

  addEventFromGoogleCalendar(accessToken: string) {

    this.gCalPar = {
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      orderBy: 'startTime'
    }
    this.gCalService.getEvents(
      this.gCalPar.calendarId,
      this.gCalPar.showDeleted,
      this.gCalPar.timeMin,
      this.gCalPar.orderBy,
      accessToken
    ).subscribe(res => {
      console.log(res)
    })


  }

  createUserWithGoogleAccount() {
    this.newuser = {
      id: undefined,
      googleId: this.googleProfiel.googleId,
      title: this.googleProfiel.name,
      eventColor: this.chosenColor,
      avatar: this.googleProfiel.profielImgUrl,
      isGoogleAccount: true,
      calType: 1
    };

    this.arrayLength = this.users.length + 1;
    this.users.push(this.newuser);
    this.dbService.addUser(this.newuser);
    this.snackBar.open('Nieuwe gebruiker toegevoegd', 'close', { duration: 3000 });
    this.addUser = false;
    this.isGoogleAccount = false
    console.log('!!!!!!!!!!!!!!!!')
    console.log(this.newuser);
    this.newuser = null;
  }

  public goTo(pad: String): void {
    this.router.navigate(['/' + pad], { relativeTo: this.route });
  }

  public saveUser() {
    if (this.isGoogleAccount)
      this.createUserWithGoogleAccount();
    else
      this.createLocalUser();

  }

  private createLocalUser() {
    this.arrayLength = this.users.length + 1;
    this.newuser = {
      id: undefined,
      googleId: null,
      title: this.addUserForm.get('title').value,
      eventColor: this.chosenColor,
      avatar: this.imageAvatar,
      isGoogleAccount: false,
      calType: 0
      //Agenda: this.addUserForm.get('Agenda').value
    };
    if (this.newuser.title != "" && this.newuser != null) {
      console.log(this.newuser);
      this.users.push(this.newuser);
      this.dbService.addUser(this.newuser);
      this.newuser = null;
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
  googleId: String
  avatar: string;
  isGoogleAccount: Boolean;
  calType: number
  //Agenda:string;
}

export interface IEvent {
  id: number;
  resourceId: number;
  start: string;
  stop: string;
  title: string;
  description: string;
}

export interface IGoogleProfiel {
  name: string;
  profielImgUrl: string;
  googleId: string;
}

export interface IGCalParameters {
  calendarId: string;
  timeMin: string;
  showDeleted: boolean;
  orderBy: string;
}