import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-panel',
  templateUrl: './status-panel.component.html',
  styleUrls: ['./status-panel.component.scss']
})
export class StatusPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  today: number = Date.now();
}
