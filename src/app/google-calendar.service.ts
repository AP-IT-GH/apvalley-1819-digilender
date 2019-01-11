import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {

  apiUrl = 'https://www.googleapis.com/calendar/v3/calendars/'


  querys = {
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    showDeleted: false,
    orderBy: 'startTime'
  }

  constructor(private http: HttpClient) { }

  getEvents(calendarId: String, showDeleted: boolean, timeMin: String, orderBy: String, accesToken: String): Observable<Icalendar> {
    return this.http.get<Icalendar>(this.apiUrl + `${calendarId}/events?showDeleted=${showDeleted}&timeMin=${timeMin}&access_token=${accesToken}`)
  }

}

export interface DefaultReminder {
  method: string;
  minutes: number;
}

export interface Creator {
  email: string;
  self: boolean;
}

export interface Organizer {
  email: string;
  displayName: string;
  self?: boolean;
}

export interface Start {
  dateTime: Date;
  timeZone: string;
}

export interface End {
  dateTime: Date;
  timeZone: string;
}

export interface Attendee {
  email: string;
  self: boolean;
  responseStatus: string;
}

export interface Reminders {
  useDefault: boolean;
}

export interface Source {
  url: string;
  title: string;
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: Date;
  updated: Date;
  summary: string;
  description: string;
  location: string;
  creator: Creator;
  organizer: Organizer;
  start: Start;
  end: End;
  transparency: string;
  visibility: string;
  iCalUID: string;
  sequence: number;
  attendees: Attendee[];
  guestsCanInviteOthers: boolean;
  privateCopy: boolean;
  reminders: Reminders;
  source: Source;
}

export interface Icalendar {
  kind: string;
  etag: string;
  summary: string;
  updated: Date;
  timeZone: string;
  accessRole: string;
  defaultReminders: DefaultReminder[];
  nextSyncToken: string;
  items: Item[];
}