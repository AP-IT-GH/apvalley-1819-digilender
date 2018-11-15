import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class HomeCalendarComponent implements OnInit {

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor() { }
  ngOnInit() {
    this.calendarOptions = {
      editable: false,
      handleWindowResize: true,
      defaultView: 'agendaWeek',
      eventLimit: false,

      header: {
        left: 'today, prev, next',
        center: 'title',
        right: 'agendaWeek,month'
      },

      displayEventTime: true, // Display event time

      events: 'https://fullcalendar.io/demo-events.json?with-resources=2'

      ,

    };
  }

}
