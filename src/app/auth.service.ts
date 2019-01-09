import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { first } from 'rxjs/operators';
import { resolve } from 'bluebird';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  calendarItems: any[];

  constructor(public afAuth: AngularFireAuth) {
    this.initClient();
    this.user$ = afAuth.authState;
  }

  // Initialize the Google API client with desired scopes
  initClient() {
    gapi.load('client', () => {
      console.log('loaded client')

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: 'AIzaSyC5s71KnhbfQpRlDMDf6gEqy6t4RiSY6_8',
        clientId: '214527435995-iu22s71kmdp4i55eddab7jq3ubtvv93b.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      })

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
      console.log(new Date().toISOString())

    });

  }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async login() {
    // const googleAuth = gapi.auth2.getAuthInstance()
    // const googleUser = await googleAuth.signIn();

    // const token = googleUser.getAuthResponse().id_token;

    // console.log(googleUser)

    // const credential = auth.GoogleAuthProvider.credential(token);

    // await this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);

    // Alternative approach, use the Firebase login with scopes and make RESTful API calls
    const provider = new auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/calendar');
    provider.setCustomParameters({
      prompt: 'select_account'
    })
    this.afAuth.auth.signInWithPopup(provider).then(res => {
      resolve(res).toJSON
      console.log(res.credential.accessToken)
      //let resJson = JSON.stringify(res.credential);
      // const credential = auth.GoogleAuthProvider.credential(res.credential.idToken);


    })
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());

  }

  logout() {
    this.afAuth.auth.signOut();
  }
  async getCalendar() {
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    })

    console.log(events)

    this.calendarItems = events.result.items;

  }


}