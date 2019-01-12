import * as $ from 'jquery';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import { ModalService } from '../modal.service';
import { DatabaseService } from '../database.service';
import { WifiService } from '../wifi.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  constructor(public wservice: WifiService, private modalService: ModalService, public db: DatabaseService, private router: Router, private route: ActivatedRoute) { }

  selectedDate: string;
  dateFromPicker: string;
  eventButton: boolean;
  selectedStartTime: string;
  selectedEndTime: string;
  eventTitle: string;
  eventDescription: string;
  selectedUserTitle: string;
  selectedEventTitle: string;
  selectedEventDescription: string;
  selectedEvent;
  selectedEventStart: string;
  selectedEventEnd: string;
  calendar;
  users;
  selectedUser;
  userFromDropdown;

  goToOptions(): void {
    this.router.navigate(['/options'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.wservice.init();
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
        return { days: -7 };
      };

      var getMaxTime = function () {
        return { days: 30 };
      };

      // let containerEl: JQuery = $('#calendar');
      $('#calendar').fullCalendar({
        //themeSystem: 'bootstrap4',
        height: $(window).height() * 0.95,
        //contentHeight: () => { return $(window).height()*0.8; },
        defaultView: 'family',
        groupByResource: false,
        customButtons: {
          today_custom: {
            text: 'Today',
            click: function () {
              $('#calendar').fullCalendar('today');
            }
          },
          myNextButton: {
            text: 'Next',
            icon: 'right-single-arrow',
            click: function () {
              $('#calendar').fullCalendar('incrementDate', {
                months: 1
              });
            }
          },
          myPrevButton: {
            text: 'Prev',
            icon: 'left-single-arrow',
            click: function () {
              $('#calendar').fullCalendar('incrementDate', {
                months: -1
              });
            }
          }
        },
        header: {
          left: 'today_custom',
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
            slotLabelFormat: 'D \n' + 'ddd ',
            buttonText: 'family Calendar',
            scrollTime: { days: 0 }
          },
        },
        slotEventOverlap: false,
        locale: "nl-be",
        timeFormat: 'HH(:mm)',
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
          me.selectedUser = resource;
          me.dateFromPicker = date.format();
          me.selectedDate = date.format().match(/.*?T/).toString();
          document.getElementById("event-body").style.backgroundColor = me.users[resource.id - 1].eventColor;
          me.openModal('event', true);
          document.getElementById("title").click();
        },
        // Voeg een beschrijving toe
        eventRender: function (event, element) {
          if (event.description)
            element.find('.fc-title').after("</br> <span class=\"event-description\">" + event.description + "</span>");
        },
        // Titel bovenaan correct tonen
        viewRender: function (view, element) {
          $('.fc-center')[0].children[1].textContent = view.title.replace(new RegExp("undefined", 'g'), "");
        },
        // Klik op een event en de details tonen
        eventClick: function (calEvent, jsEvent, view) {
          me.selectedEvent = calEvent;
          console.log(me.selectedEvent);
          me.selectedUserTitle = me.users[calEvent.resourceId - 1].title;
          me.selectedEventTitle = calEvent.title;
          me.selectedEventDescription = calEvent.description;
          me.selectedEventStart = calEvent.start.toString().match(/\d{2}:\d{2}/).toString();
          me.selectedEventEnd = calEvent.stop.toString().match(/\d{2}:\d{2}/).toString();
          document.getElementById("event-detail-body").style.backgroundColor = me.users[calEvent.resourceId - 1].eventColor;
          me.openModal('event-detail', true);
          document.getElementById("detail-title").click();

          // me.db.getEvents(calEvent.resourceId).then((events) => {
          //   console.log(events[0].title);
          // });
        }
      });
    })
  }

  openModal(id: string, isDatePicked: boolean) {
    if (!isDatePicked) {
      this.dateFromPicker = '';
      document.getElementById("event-body").style.backgroundColor = '#f4f1ea';
      document.getElementById("event-detail-body").style.backgroundColor = '#f4f1ea';
    }
    this.eventButton = !isDatePicked;
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();
    this.selectedStartTime = ("0" + currentHour).slice(-2) + ":" + ("0" + currentMinute).slice(-2);
    if (currentHour < 23)
      this.selectedEndTime = ("0" + (currentHour + 1)).slice(-2) + ":" + ("0" + currentMinute).slice(-2);
    else
      this.selectedEndTime = "00:" + ("0" + currentMinute).slice(-2);
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  resetCalendar() {
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
    this.openModal('event', true);
  }

  addEvent() {
    if (this.eventButton) {
      var dateFromPicker = new Date(this.dateFromPicker);
      this.selectedDate = dateFromPicker.getFullYear() + "-" + ('0' + (dateFromPicker.getMonth() + 1)).slice(-2) + "-" + ('0' + dateFromPicker.getDate()).slice(-2) + "T";
    }
    else {
      this.userFromDropdown = this.selectedUser.id;
    }

    if (this.eventTitle != "" && this.eventTitle != null && this.dateFromPicker != '') {
      if(this.selectedEvent && this.selectedEvent.id){
        console.log("edit, not add");
        console.log("res id:");
        resourceId: this.userFromDropdown,
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
          resourceId: this.userFromDropdown,
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
