import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-home-calendar',
  templateUrl: './home-calendar.component.html',
  styleUrls: ['./home-calendar.component.scss']
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
      //minTime: '07:30:00', // Start time for the calendar
      //maxTime: '22:00:00', // End time for the calendar
      header: {
        left: 'today previus, next',
        center: 'title',
        right: 'agendaWeek,month'
      },
      displayEventTime: true, // Display event time

      events: 'https://fullcalendar.io/demo-events.json?with-resources=2'

      ,

    };
  }

}
