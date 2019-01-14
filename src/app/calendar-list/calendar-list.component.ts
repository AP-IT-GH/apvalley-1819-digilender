import * as $ from 'jquery';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {

  constructor(public db: DatabaseService) { }
  events = new Array();

  ngOnInit(): void {
    this.getTodayEvents();

    this.db.change.subscribe(result => {
      console.log("Change detected from calendar component");
      this.events = [];
      this.getTodayEvents();
    });
  }

  getTodayEvents() {
    console.log(this.events);
    this.db.getEvents(undefined).then((events) => {

      var today = new Date();
      var todayString: String = today.getFullYear() + "-" + ('0' + (today.getMonth() + 1)).slice(-2) + "-" + ('0' + today.getDate()).slice(-2) + "T";

      events.forEach(element => {
        var eventDate: String = element.startActual.match(/.*?T/).toString();
        if (eventDate == todayString) {
          this.db.getUsers(element.resourceId).then((user) => {
            element.color = user.eventColor;
            this.events.push(element);
            this.events.sort(function (a, b) { return (a.startActual > b.startActual) ? 1 : ((b.startActual > a.startActual) ? -1 : 0); });
            document.getElementById("calendar-list").click();
          });
        }
      });
    });
  }
}
