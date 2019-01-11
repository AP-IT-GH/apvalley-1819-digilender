import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { first } from 'rxjs/operators';
import { resolve } from 'bluebird';

//declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class authService {

  user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async login() {

    const provider = new auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/calendar');
    provider.setCustomParameters({
      prompt: 'select_account'
    })
    this.afAuth.auth.signInWithPopup(provider).then(res => {
      console.log(res.credential.accessToken)
    })
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}


