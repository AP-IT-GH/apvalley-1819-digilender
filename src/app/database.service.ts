import { Injectable, EventEmitter } from '@angular/core';
//import { ipcRenderer } from 'electron';
import { PromiseIpc } from 'electron-promise-ipc';
const promiseIpc = new PromiseIpc();

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
    this.getUsers();
    this.getEvents(undefined);
  }

  getUsers() {
    return promiseIpc.send('users', { action: 'get' })
      .then((users) => {
        console.log("got users");
        console.log(users);
        let tmp = JSON.parse(users);
        console.log(tmp);
        return tmp;
      });
  }

  addUser(user: User) {
    return promiseIpc.send('users', { action: 'put', value: user })
      .then((user) => {
        console.log(user);
        let tmp = JSON.parse(user);
        console.log(tmp);
        return tmp;
      });
  }

  getEvents(userId: number) {
    return promiseIpc.send('events', { action: 'get', userId: userId })
      .then((events) => {
        console.log(events);
        let tmp = JSON.parse(events);
        console.log(tmp);
        return tmp;
      });

  }

  addEvent(event: Event) {
    return promiseIpc.send('events', { action: 'put', value: event })
      .then((newEvent) => {
        console.log(newEvent);
        let tmp = JSON.parse(newEvent);
        console.log(tmp);
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
  stop: string;
  title: string;
  description: string;
}


