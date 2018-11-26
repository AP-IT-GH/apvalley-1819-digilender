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
        defaultView: 'agendaWeek',
        groupByResource: true,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'agendaWeek,agendaMonth,listThreeDay,month'
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
        eventTextColor: 'white',
        // resources: [
        //   { id: '1', title: 'Bram' },
        //   { id: '2', title: 'Tom' },
        //   { id: '3', title: 'Tim' },
        //   { id: '4', title: 'Elke' },
        //   { id: '5', title: 'Mirko' }
        // ],
        // events: 'https://fullcalendar.io/demo-events.json?with-resources=2',
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        dayClick: function (date, jsEvent, view) {
          date.utc()

          // alert('Clicked on: ' + date.format());
          // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
          // alert('Current view: ' + view.name);

          var title = prompt('Enter a title');

          if (title != '' && title != null) {
            var description = prompt('Enter a description (optional)');
            $('#calendar').fullCalendar('renderEvent', {
              title: title,
              start: date.format(),
              allDay: false,
              editable: true,
              description: description
            }, true);
          }
          else
            alert('Invalid title');

          // $(this).css('background-color', 'red');
        },

        eventRender: function (event, element) {
          if (event.description)
            element.find('.fc-title').after("</br> <span class=\"event-description\">" + event.description + "</span>");
        }
      });

    })

  }
}
