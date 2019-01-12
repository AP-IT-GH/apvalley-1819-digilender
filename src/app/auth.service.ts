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

    return await this.afAuth.auth.signInWithPopup(provider)
  }


  logout() {
    this.afAuth.auth.signOut();
  }
}

export interface IGoogleProfiel {
  name: string;
  profielImgUrl: string;
  googleId: string;
}



