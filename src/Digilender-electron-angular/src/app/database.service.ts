import { Injectable } from '@angular/core';
//import { ipcRenderer } from 'electron';
import { PromiseIpc } from 'electron-promise-ipc';
const promiseIpc = new PromiseIpc();

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {
    this.getUsers();
    this.getEvents(5);
    this.addUser({id: undefined, name: 'joeri', calType: 0, login: 'jlogin', pass: 'jpass'});
    this.addEvent({id: undefined, UserId: 1, start: '2018-12-02T08:00:00', stop: '', description: "ayy lmao", title: "lol" });
  }

  getUsers(){
    return promiseIpc.send('users', {action: 'get'})
      .then((users) => {
        console.log("got users");
        console.log(users);
        let tmp = JSON.parse(users);
        console.log(tmp);
        return tmp;
      });
  }

  addUser(user: User){
    return promiseIpc.send('users', {action: 'put', value: user})
      .then((user) => {
        console.log(user);
        let tmp = JSON.parse(user);
        console.log(tmp);
        return tmp;
      });
  }

  getEvents(userId: number){
    return promiseIpc.send('events', {action: 'get', userId: userId})
      .then((events) => {
        console.log(events);
        let tmp = JSON.parse(events);
        console.log(tmp);
        return tmp;
      });
    
  }

  addEvent(event: Event){
    return promiseIpc.send('events', {action: 'put', value: event})
      .then((newEvent) => {
        console.log(newEvent);
        let tmp = JSON.parse(newEvent);
        console.log(tmp);
        return tmp;
      });
  }
}

export interface User{
  id: number;
  name: string;
  calType: number;
  login: string;
  pass: string;
}  

export interface Event{
  id: number;
  UserId: number;
  start: string;
  stop: string;
  title: string;
  description: string;
}


