import * as $ from 'jquery';
import { Component, OnInit, ViewChild } from '@angular/core';
import 'fullcalendar';
import 'fullcalendar-scheduler';
import { ModalService } from '../modal.service';
import { DatabaseService } from '../database.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  selectedEventDate: string;
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
        var time = me.calendar.fullCalendar('today');
        console.log("getMinTime: " + time);
        return time;
      };

      var getMaxTime = function () {
        var days = 7;
        var time = days + ".00:00:00";
        return time;
      };

      // let containerEl: JQuery = $('#calendar');
      $('#calendar').fullCalendar({
        //themeSystem: 'bootstrap4',
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
            slotLabelFormat: 'D MMM ',
            buttonText: 'family Calendar'
          },
        },
        selectable: false,
        editable: false,
        nowIndicator: true,
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
          me.selectedDate = date.format().match(/.*?T/).toString();
          me.selectedStartTime = "00:00";
          me.selectedEndTime = "01:00";
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
          me.selectedUserTitle = me.users[calEvent.resourceId - 1].title;
          me.selectedEventTitle = calEvent.title;
          me.selectedEventDescription = calEvent.description;
          me.selectedEventDate = calEvent.start.toString().match(/\d{2}:\d{2}/).toString();
          document.getElementById("event-detail-body").style.backgroundColor = me.users[calEvent.resourceId - 1].eventColor;
          me.openModal('event-detail');
          document.getElementById("event-detail").click();
        }
      });

      // Werkende optie om overschot onderaan calender weg te halen
      me.calendar.fullCalendar('option', 'contentHeight', "auto");
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  addEvent() {
    if (this.eventTitle != "" && this.eventTitle != null) {
      this.db.addEvent({
        id: undefined,
        resourceId: this.selectedUser.id,
        start: this.selectedDate + this.selectedStartTime,
        stop: this.selectedDate + this.selectedEndTime,
        description: this.eventDescription,
        title: this.eventTitle
      });
      this.closeModal('event');
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
