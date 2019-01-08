import { Injectable, EventEmitter } from '@angular/core';
//import { ipcRenderer } from 'electron';
import { PromiseIpc } from 'electron-promise-ipc';
const promiseIpc = new PromiseIpc();
import { from } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WifiService {

  constructor() {
  }

  getNetworks() {
    return promiseIpc.send('wifi', { action: 'get' })
      .then((result) => {
        console.log(result);
        return JSON.parse(JSON.stringify(result));
        });
  }

  connect(network) {
    return promiseIpc.send('wifi', { 
      action: 'connect',
      ssid: network.ssid,
      password: network.pass
    }).then((result) => {
      console.log(result);
      let tmp = JSON.parse(JSON.stringify(result));
      return tmp;
    });
  }
}
