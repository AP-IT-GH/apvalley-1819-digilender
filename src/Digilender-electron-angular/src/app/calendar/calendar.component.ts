import * as $ from 'jquery';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'fullcalendar';
import 'fullcalendar-scheduler';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class HomeCalendarComponent implements OnInit {
  ngOnInit(): void {
    $(function () {

      var getDaysInMonth = function () {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        return new Date(year, month, 0).getDate();
      };

      var getMonthDay = function () {
        var d = new Date();
        return d.getDate();
      };

      var getMinTime = function () {
        var days = getMonthDay() - 1;
        var time = "-" + days + ".00:00:00";
        return time;
      };

      var getMaxTime = function () {
        var days = getDaysInMonth() - getMonthDay() - 22;
        var time = days + ".00:00:00";
        return time;
      };

    // let containerEl: JQuery = $('#calendar');
      $('#calendar').fullCalendar({
        defaultView: 'agendaMonth',
        groupByResource: true,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'agendaMonth,listThreeDay,agendaWeek,month'
        },
        views: {
          listThreeDay: {
            type: 'list',
            duration: {
              days: 31
            }
          },
          agendaMonth: {
            type: 'agendaDay',
            minTime: getMinTime(),
            maxTime: getMaxTime(),
            slotDuration: '24:00:00',
            slotLabelFormat: 'D MMMM YYYY',
            buttonText: 'Week'
          },
        },
        selectable: false,
        nowIndicator: false,
        allDaySlot: false,
        // resources: [
        //   { id: '1', title: 'Bram' },
        //   { id: '2', title: 'Tom' },
        //   { id: '3', title: 'Tim' },
        //   { id: '4', title: 'Elke' },
        //   { id: '5', title: 'Mirko' }
        // ],
        events: 'https://fullcalendar.io/demo-events.json?with-resources=2'
      });

    })

  }
}
