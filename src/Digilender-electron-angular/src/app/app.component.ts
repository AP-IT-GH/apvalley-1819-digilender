import { Component, OnDestroy, OnInit } from '@angular/core';
import '../app/modal/modal.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isLeftVisible = true;
  ngOnInit() {

  }

}