import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetupControllerService {

  constructor() { }

  private isCompletedWifi = new BehaviorSubject(true); //TODO set these 2 back to false
  private isCompletedLocation = new BehaviorSubject(true);

  private isCompletedWifiBusy = new BehaviorSubject(false);
  completedWifiBusy = this.isCompletedWifiBusy.asObservable();

  completedWifi = this.isCompletedWifi.asObservable();
  completedLocation = this.isCompletedLocation.asObservable();

  private isChangedTheme = new BehaviorSubject(false);
  changeThemes = this.isChangedTheme.asObservable();



  setCompletedWifi(_isCompletedWifi: boolean) {
    this.isCompletedWifiBusy.next(_isCompletedWifi)
    setTimeout(() => {
      this.isCompletedWifi.next(_isCompletedWifi);
    }, 3000);
  }

  setCompletedLocation(_isCompletedLocation) {
    this.isCompletedLocation.next(_isCompletedLocation);
  }


  changeTheme(_change){
    this.isChangedTheme.next(_change)
  }

}






