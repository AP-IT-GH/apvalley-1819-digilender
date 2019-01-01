import { Injectable, EventEmitter } from '@angular/core';
//import { ipcRenderer } from 'electron';
import { PromiseIpc } from 'electron-promise-ipc';
const promiseIpc = new PromiseIpc();

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
  }

  getUsers() {
    return promiseIpc.send('users', { action: 'get' })
      .then((users) => {
        let tmp = JSON.parse(users);
        return tmp;
      });
  }

  addUser(user: User) {
    return promiseIpc.send('users', { action: 'put', value: user })
      .then((user) => {
        let tmp = JSON.parse(user);
        return tmp;
      });
  }

  getEvents(userId: number) {
    return promiseIpc.send('events', { action: 'get', userId: userId })
      .then((events) => {
        let tmp = JSON.parse(events);
        return tmp;
      });

  }

  addEvent(event: Event) {
    return promiseIpc.send('events', { action: 'put', value: event })
      .then((newEvent) => {
        let tmp = JSON.parse(newEvent);
        return tmp;
      });
  }

  public change: EventEmitter<any> = new EventEmitter();

  public emitChange() {
    this.change.emit();
  }
}

export interface User {
  id: String;
  title: String;
  eventColor: String;
}

export interface Event {
  id: number;
  resourceId: number;
  start: string;
  startActual: string;
  stop: string;
  title: string;
  description: string;
}


