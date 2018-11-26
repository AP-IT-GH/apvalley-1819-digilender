import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

    constructor() { }

    getUsers(){
        return ipcRenderer.sendSync('querryDB', 'hey');
    }
}
