import * as $ from 'jquery';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import { ModalService } from '../modal.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class HomeCalendarComponent implements OnInit {

  constructor(private modalService: ModalService, public db: DatabaseService) { }

  selectedDate: string;
  selectedUser;
  eventTitle: string;
  eventDescription: string;
  calendar;

  ngOnInit(): void {
    var me = this;
    $(function () {
      me.calendar = $('#calendar');
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
        var time = $('#calendar').fullCalendar('today');
        console.log("getMinTime: "+time);
        return time;
      };


      var getMaxTime = function () {
        var days = 7;
        var time = days + ".00:00:00";
        return time;
      };

      // let containerEl: JQuery = $('#calendar');
      $('#calendar').fullCalendar({
        themeSystem: 'bootstrap4',
        height: $(window).height() * 0.83,
        defaultView: 'family',
        groupByResource: false,
        header: {
          left: 'today',
          center: 'prev, title, next',
          right: ''
        },
        views: {
          family: {
            type: 'agendaDay',
            duration: {
              days: 1
            },
            minTime: getMinTime(),
            maxTime: getMaxTime(),
            slotDuration: '24:00:00',
            titleFormat: 'MMMM YYYY',
            slotLabelFormat: 'D MMMM YYYY',
            buttonText: 'family Calendar'
          },
        },
        selectable: false,
        editable: false,
        nowIndicator: true,
        allDaySlot: false,
        eventTextColor: 'white',
        resources: function (callback) {
          console.log("getting resources");
          me.db.getUsers().then(function (users) {
            console.log("got resources");
            console.log(users);
            callback(users);
          })
        },
        events: (start, end, timezone, callback) => {
          me.db.getEvents(undefined).then((events) => {
            callback(events);
          });
        },
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        dayClick: function (date, jsEvent, view, resource) {
          // alert('Clicked on: ' + date.format());
          // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
          // alert('Current view: ' + view.name);

          me.selectedUser = resource;
          me.selectedDate = date.format();
          me.openModal('Event');

          // $(this).css('background-color', 'red');
        },

        eventRender: function (event, element) {
          if (event.description)
            element.find('.fc-title').after("</br> <span class=\"event-description\">" + event.description + "</span>");
        },
        //titel bovenaan correct tonen
        viewRender: function(view, element) {   
          $('.fc-center')[0].children[1].textContent= view.title.replace(new RegExp("undefined", 'g'), ""); ;       
        },
        

      });
      
     
      //werkende optie om overschot onderaan calender weg te halen
      $('#calendar').fullCalendar('option', 'contentHeight', "auto");
     /*  $('#calendar').hammer().on("swipeleft",function(event) {   
        $('#calendar').fullCalendar('next');
      }); */
      
    })
  }
//http://hammerjs.github.io/getting-started/kl
//https://jsfiddle.net/Fahreyad/w4cab9m6/1/
 /*  var calendar=$('#calendar');
  calendar.hammer().on("swipeleft", function(event) {   
    calendar.fullCalendar('next');
  });
 */
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  addEvent() {
    var me = this;
    if (this.eventTitle != "" && this.eventTitle != null) {
      me.calendar.fullCalendar('renderEvent', {
        resourceId: this.selectedUser.id,
        title: this.eventTitle,
        start: this.selectedDate,
        allDay: false,
        editable: false,
        description: this.eventDescription
      }, false);
      this.db.addEvent(
        {
          id: undefined,
          resourceId: this.selectedUser.id, start: this.selectedDate,
          stop: '', description: this.eventDescription,
          title: this.eventTitle
        });
      this.closeModal('Event');
      this.eventTitle = "";
      this.eventDescription = "";
      // Alert that there has been a change in the database
      this.db.emitChange();
    }
  }
}
