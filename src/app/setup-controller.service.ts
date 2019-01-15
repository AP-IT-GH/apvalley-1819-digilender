import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetupControllerService {

  constructor() { }

  private isCompletedWifi = new BehaviorSubject(true); //TODO set these 2 back to false
  completedWifi = this.isCompletedWifi.asObservable();

  private isCompletedLocation = new BehaviorSubject(true);
  completedLocation = this.isCompletedLocation.asObservable();

  private isCompletedWifiBusy = new BehaviorSubject(false);
  completedWifiBusy = this.isCompletedWifiBusy.asObservable();


  private isChangedTheme = new BehaviorSubject(false);
  changeThemes = this.isChangedTheme.asObservable();

  private valueBrightness = new BehaviorSubject(100);
  onChangeBrightness = this.valueBrightness.asObservable()

  setBrightness(_valueBrightness){
    this.valueBrightness.next(_valueBrightness)
    //console.log(_valueBrightness)
  }



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






