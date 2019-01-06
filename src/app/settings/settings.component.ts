import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from '../routing-animations';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [fadeAnimation] // register the animation
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
