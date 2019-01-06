import { Component, OnInit } from '@angular/core';
import { SetupControllerService } from "../setup-controller.service";

@Component({
  selector: 'app-intro-setup',
  templateUrl: './intro-setup.component.html',
  styleUrls: ['./intro-setup.component.scss']
})
export class IntroSetupComponent implements OnInit {

  isCompletedWifi: boolean
  isCompletedLocation: boolean

  isCompletedWifiBusy: boolean

  constructor(private setupService: SetupControllerService) { }

  ngOnInit() {
    this.setupService.completedWifi.subscribe((isCompleted:boolean) => {
      this.isCompletedWifiBusy = false
      this.isCompletedWifi = isCompleted;
      console.log(this.isCompletedWifi)
    })

    this.setupService.completedLocation.subscribe((isCompleted:boolean) => {
      this.isCompletedLocation = isCompleted;
    })

    this.setupService.completedWifiBusy.subscribe((isBusy:boolean) => {
      this.isCompletedWifiBusy = isBusy
      console.log(this.isCompletedWifiBusy)
    })


  }

}
