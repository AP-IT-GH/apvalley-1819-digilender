import * as $ from 'jquery';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import { ModalService } from '../modal.service';
import { DatabaseService } from '../database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { toDate } from '@angular/common/src/i18n/format_date';
import { months } from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class HomeCalendarComponent implements OnInit {

  constructor(private modalService: ModalService, public db: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  selectedDate: string;
  selectedStartTime: string;
  selectedEndTime: string;
  eventTitle: string;
  eventDescription: string;
  selectedUserTitle: string;
  selectedEventTitle: string;
  selectedEventDescription: string;
  selectedEventTime: string;
  selectedEvent;
  calendar;
  users;
  selectedUser;

  goToOptions(): void {
    this.router.navigate(['/options'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    // Selector om de scope te veranderen
    var me = this;

    $(function () {
  
      
      me.calendar = $('#calendar');

      var getDaysInMonth = function () {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        return new Date(year, month, 0).getDate();
      };

      // Niet meer nodig door today-functie
      var getMonthDay = function () {
        var d = new Date();
        return d.getDate();
      };

      var getMinTime = function () {
        return {days: -7};
      };

      var getMaxTime = function () {
        return {days: 30};
      };
     
      // let containerEl: JQuery = $('#calendar');
      $('#calendar').fullCalendar({
        //themeSystem: 'bootstrap4',
        height: $(window).height()*0.95,
        //contentHeight: () => { return $(window).height()*0.8; },
        defaultView: 'family',
        groupByResource: false,
        customButtons: {
          myNextButton: {
            text: 'Next',
            icon: 'right-single-arrow',
            click: function() {
              $('#calendar').fullCalendar('incrementDate', {
                months: 1
              });
            }
          },
          myPrevButton: {
            text: 'Prev',
            icon: 'left-single-arrow',
            click: function() {
              $('#calendar').fullCalendar('incrementDate', {
                months: -1
              });
            }
          }
        },
        header: {
          left: 'today',
          center: 'myPrevButton, title, myNextButton',
          right: ''
        },
        views: {
          family: {
            type: 'agendaDay',
            duration: {
              days: 1
            },
            visibleRange: (current) => {
              return {
                start: current.clone().subtract(7, 'days'),
                end: current.clone().add(1, 'months')
              }
            },
            // how far back you can scroll
            minTime: getMinTime(),
            // how far forwards you can scroll
            maxTime: getMaxTime(),
            slotDuration: '24:00:00',
            titleFormat: 'MMMM YYYY',
            slotLabelFormat: 'D \n'+ 'ddd ',
            buttonText: 'family Calendar',
            scrollTime: {days: 0}
          },
        },
        slotEventOverlap:false,
        locale:"nl-be",
        selectable: false,
        editable: false,
        allDaySlot: false,
        eventTextColor: 'white',
        // Haal de resources vanuit de database (= users)
        resources: function (callback) {
          console.log("getting resources");
          me.db.getUsers().then(function (users) {
            console.log("got resources");
            console.log(users);
            callback(users);
            me.users = users;
          })
        },
        // Haal de events uit de database
        events: (start, end, timezone, callback) => {
          me.db.getEvents(undefined).then((events) => {
            callback(events);
          });
        },
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        // Klik op een lege plek op de kalender
        dayClick: function (date, jsEvent, view, resource) {
          me.selectedUser = resource.id;
          me.selectedDate = date.format().match(/.*?T/).toString();
          me.selectedStartTime = "00:00";
          me.selectedEndTime = "01:00";
          document.getElementById("event-body").style.backgroundColor = me.users[resource.id - 1].eventColor;
          me.openModal('event');
          document.getElementById("event").click();
        },
        // Voeg een beschrijving toe
        eventRender: function (event, element) {
          if (event.description)
            element.find('.fc-title').after("</br> <span class=\"event-description\">" + event.description + "</span>");
        },
        // Titel bovenaan correct tonen
        viewRender: function (view, element) {
          $('.fc-center')[0].children[1].textContent = view.title.replace(new RegExp("undefined", 'g'), "");;
        },
        // Klik op een event en de details tonen
        eventClick: function (calEvent, jsEvent, view) {
          me.selectedEvent = calEvent;
          console.log(me.selectedEvent);
          me.selectedUserTitle = me.users[calEvent.resourceId - 1].title;
          me.selectedEventTitle = calEvent.title;
          me.selectedEventDescription = calEvent.description;
          me.selectedEventTime = calEvent.start.toString().match(/\d{2}:\d{2}/).toString();
          document.getElementById("event-detail-body").style.backgroundColor = me.users[calEvent.resourceId - 1].eventColor;
          me.openModal('event-detail');
          document.getElementById("event-detail").click();

          // me.db.getEvents(calEvent.resourceId).then((events) => {
          //   console.log(events[0].title);
          // });

        }
      });
    })
  }
  

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  resetCalendar(){
    $('#calendar').fullCalendar('render');
    console.log($('#calendar').fullCalendar('today'));
  }

  editEvent() {
    console.log("pressed editevent");
    console.log(this.selectedEvent);
    this.eventTitle = this.selectedEvent.title;
    this.eventDescription = this.selectedEvent.description;
    this.selectedUser = this.selectedEvent.resourceId;
    this.selectedStartTime = this.selectedEvent.start;
    this.selectedEndTime = this.selectedEvent.stop;
    this.closeModal('event-detail');
    this.openModal('event');
  }

  addEvent() {
    if (this.eventTitle != "" && this.eventTitle != null) {
      if(this.selectedEvent && this.selectedEvent.id){
        console.log("edit, not add");
        console.log("res id:");
        console.log(this.selectedUser);
        console.log(this.db.addEvent({
          id: this.selectedEvent.id,
          resourceId: this.selectedUser,
          start: this.selectedDate + this.selectedStartTime,
          stop: this.selectedDate + this.selectedEndTime,
          description: this.eventDescription,
          title: this.eventTitle
        }));
        $('#calendar').fullCalendar('updateEvent', this.selectedEvent);
      }
      else{
        this.db.addEvent({
          id: undefined,
          resourceId: this.selectedUser,
          start: this.selectedDate + this.selectedStartTime,
          stop: this.selectedDate + this.selectedEndTime,
          description: this.eventDescription,
          title: this.eventTitle
        });
      }
      this.closeModal('event');
      this.selectedEvent = undefined;
      this.eventTitle = "";
      this.eventDescription = "";
      // Alert that there has been a change in the database and refetch the events
      this.db.getEvents(undefined).then(() => {
        this.db.emitChange();
        this.calendar.fullCalendar('refetchEvents');
      });
    }
  }
}
