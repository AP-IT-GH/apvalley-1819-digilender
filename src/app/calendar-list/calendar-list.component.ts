import * as $ from 'jquery';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import { DatabaseService } from '../database.service';
import { moment } from 'fullcalendar';

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.scss']
})
export class CalendarListComponent implements OnInit {

  constructor(public db: DatabaseService) { }

  ngOnInit(): void {
    var self = this;
    // Dynamically add events to the list when one is added to the database
    this.db.change.subscribe(result => {
      $('#calendar-list').fullCalendar('refetchEvents');
      console.log("Change detected from calendar component");
    });
    $(function () {
      $('#calendar-list').fullCalendar({
        height: $(window).height() * 0.83,
        defaultView: 'listDay',
        groupByResource: true,
        header: false,
        views: { listDay: {} },
        selectable: false,
        locale: "nl-be",
        timeFormat: 'HH(:mm)',
        allDaySlot: false,
        listDayFormat: false,
        listDayAltFormat: false,
        noEventsMessage: "There are no events today",
        eventTextColor: 'white',
        events: (start, end, timezone, callback) => {
          self.db.getEvents(undefined).then((events) => {
            callback(events);
            console.log(events);
           /*  for(var i =0; i<events.lenght(); i++){
              if (events.start.contains())
            } */
            //var todayEvents = events.filter()
              var vandaag = moment().inspect();   
              console.log("Vandaag: "+vandaag);
              var eventsVandaag = $('#calendar').fullCalendar('clientEvents', function(evt) {
              return evt.start == vandaag;             
              });
              console.log(eventsVandaag)
          });
        },
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        dayClick: function (date, jsEvent, view) {
          date.utc()
        },
      });

      // Werkende optie om overschot onderaan calender weg te halen
      $('#calendar-list').fullCalendar('option', 'contentHeight', "auto");
    })
  }
}
