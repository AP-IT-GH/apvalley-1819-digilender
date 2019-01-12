import { Component, OnDestroy, OnInit } from '@angular/core';
import '../app/modal/modal.scss';
import { fadeAnimation } from './routing-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation] // register the animation
})

export class AppComponent implements OnInit {

  ngOnInit() {

  }

}