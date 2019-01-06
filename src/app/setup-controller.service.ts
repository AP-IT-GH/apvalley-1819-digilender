import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetupControllerService {

  constructor() { }

  private isCompletedWifi = new BehaviorSubject(false);
  private isCompletedLocation = new BehaviorSubject(false);

  private isCompletedWifiBusy = new BehaviorSubject(false);
  completedWifiBusy = this.isCompletedWifiBusy.asObservable();

  completedWifi = this.isCompletedWifi.asObservable();
  completedLocation = this.isCompletedLocation.asObservable();

  setCompletedWifi(_isCompletedWifi: boolean) {
    this.isCompletedWifiBusy.next(_isCompletedWifi)
   // console.log(this.completedWifiBusy)
    setTimeout(() => {
      this.isCompletedWifi.next(_isCompletedWifi);
    }, 3000);
  }

  setCompletedLocation(_isCompletedLocation) {
    this.isCompletedLocation.next(_isCompletedLocation);
  }
  // getCompletedWifi() {
  //   return this.isCompletedWifi;
  // }


  // getCompletedLocation() {
  //   return this.isCompletedWifi;
  // }

}

interface ICompleted {
  isCompletedWifi: boolean,
  isCompletedLocation: boolean
}




