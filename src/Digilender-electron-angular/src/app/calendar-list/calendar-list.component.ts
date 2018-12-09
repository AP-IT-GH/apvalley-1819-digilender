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

  ngOnInit(): void {
    var me = this;
    $(function () {
      var getDaysInMonth = function () {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        return new Date(year, month, 0).getDate();
      };

      //niet meer nodig door today-functie
      var getMonthDay = function () {
        var d = new Date();
        return d.getDate();
      };

      var getMinTime = function () {
        var time = $('#calendar-list').fullCalendar('today');
        return time;
      };

      var getMaxTime = function () {
        var days = 7;
        var time = days + ".00:00:00";
        return time;
      };

      // let containerEl: JQuery = $('#calendar');
      $('#calendar-list').fullCalendar({
        height: $(window).height() * 0.83,
        defaultView: 'listThreeDay',
        groupByResource: true,
        header: false,
        views: {
          listThreeDay: {
            type: 'list',
            duration: {
              days: 31
            }
          }
        },
        selectable: false,
        nowIndicator: true,
        allDaySlot: false,
        eventTextColor: 'white',
        // resources: [
        //   { id: '1', title: 'Bram' },
        //   { id: '2', title: 'Tom' },
        //   { id: '3', title: 'Tim' },
        //   { id: '4', title: 'Elke' },
        //   { id: '5', title: 'Mirko' }
        // ],
        events: (start, end, timezone, callback) => {
          me.db.getEvents(undefined).then((events) => {
            callback(events);
          });
        },
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        dayClick: function (date, jsEvent, view) {
          date.utc()
        },
      });
      //werkende optie om overschot onderaan calender weg te halen
      $('#calendar-list').fullCalendar('option', 'contentHeight', "auto");
    })
  }
}
