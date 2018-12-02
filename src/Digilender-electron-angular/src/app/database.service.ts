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
    this.addEvent({id: undefined, UserId: 1, startDate: '2018-12-02T08:00:00', stopDate: '', description: "ayy lmao" });
  }

  getUsers(){
    return promiseIpc.send('Users', {action: 'get'})
      .then((users) => {
        console.log(users);
        return users;
      });
  }

  addUser(user: User){
    return promiseIpc.send('users', {action: 'put', value: user});
  }

  getEvents(userId: number){
    return promiseIpc.send('events', {action: 'get', userId: userId})
      .then((events) =>{
        console.log(events);
        return events;
    });
  }

  addEvent(event: Event){
    return promiseIpc.send('events', {action: 'put', value: event});
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
  startDate: string;
  stopDate: string;
  description: string;
}


