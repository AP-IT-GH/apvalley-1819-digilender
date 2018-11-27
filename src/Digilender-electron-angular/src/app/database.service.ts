import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
    this.getUsers();
  }

  getUsers(){
    console.log(ipcRenderer.sendSync('querryDB', 'users all')); 
    let users = new Array<User>();
    users.push({name: "Elke", calType: 0, login: 'elkun', pass: 'elkpw'});
    users.push({name: "Antoinne", calType: 0, login: 'antun', pass: 'antpw'});
    users.push({name: "Mohammed",  calType: 0 , login: 'mohun', pass: 'mohpw'});
    users.push({name: "Reno", calType: 0, login: 'renun', pass: 'renpw'});
    users.push({name: "Coralie", calType: 0, login: 'corun', pass: 'corpw'});
    return users;
      
  }

  getEvents(name: string){
    console.log(ipcRenderer.sendSync('querryDB', 'events select name' + name));
    let events = new Array<Event>();
    events.push({eventId: 0, userName: name, startDate: '2018-11-28T08:00:00', stopDate: '2018-11-28T08:00:00', Description: 'wash my spaceship'});
    events.push({eventId: 1, userName: name, startDate: '2018-11-29T08:00:00', stopDate: '2018-11-29T08:00:00', Description: 'wash my spaceship'});
    events.push({eventId: 2, userName: name, startDate: '2018-11-30T08:00:00', stopDate: '2018-11-30T08:00:00', Description: 'wash my spaceship'});
    events.push({eventId: 3, userName: name, startDate: '2018-12-01T08:00:00', stopDate: '2018-12-01T08:00:00', Description: 'wash my spaceship'});
    events.push({eventId: 4, userName: name, startDate: '2018-12-02T08:00:00', stopDate: '2018-12-02T08:00:00', Description: 'wash my spaceship'});
    events.push({eventId: 5, userName: name, startDate: '2018-12-03T08:00:00', stopDate: '2018-12-03T08:00:00', Description: 'wash my spaceship'});
    events.push({eventId: 6, userName: name, startDate: '2018-12-04T08:00:00', stopDate: '2018-12-04T08:00:00', Description: 'wash my spaceship'});
    events.push({eventId: 7, userName: name, startDate: '2018-12-05T08:00:00', stopDate: '2018-12-05T08:00:00', Description: 'wash my spaceship'});
    events.push({eventId: 8, userName: name, startDate: '2018-12-06T08:00:00', stopDate: '2018-12-06T08:00:00', Description: 'wash my spaceship'});
    return events
  }
}

export interface User{
  name: string;
  calType: number;
  login: string;
  pass: string;
}  

export interface Event{
  eventId: number;
  userName: string;
  startDate: string;
  stopDate: string;
  Description: string;
}


