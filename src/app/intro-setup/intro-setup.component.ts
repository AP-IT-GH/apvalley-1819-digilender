import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro-setup',
  templateUrl: './intro-setup.component.html',
  styleUrls: ['./intro-setup.component.scss']
})
export class IntroSetupComponent implements OnInit {

  isCompletedWifi=true
  isCompletedLocation= true

  constructor() { }

  ngOnInit() {
  }

}
