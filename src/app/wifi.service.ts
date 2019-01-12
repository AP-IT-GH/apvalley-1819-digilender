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
  networks;

  constructor() {
  }

  init() {
    this.updateNetworks().then((networks) => {
      this.networks = networks;
    });
  }

  updateNetworks() {
    return promiseIpc.send('wifi', { action: 'get' })
      .then((result) => {
        console.log(result);
        return JSON.parse(JSON.stringify(result));
        });
  }

  getNetworks() {
    return this.networks;
  }

  connect(ssid, pass) {
    console.log("got connect request");
    console.log(ssid);
    console.log(pass);
    return promiseIpc.send('wifi', { 
      action: 'connect',
      ssid: ssid,
      password: pass
    }).then((result) => {
      console.log("got result");
      console.log(result);
      let tmp = JSON.parse(JSON.stringify(result));
      return tmp;
    });
  }
}
