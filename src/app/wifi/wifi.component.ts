import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SetupControllerService } from "../setup-controller.service";

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent {


  constructor(public dialog: MatDialog) { }

  openDialog(SSID) {
    this.dialog.open(DialogContentWifi, {
      data: SSID.name
    },);


  }





  dummySSIDs: Section[] = [
    {
      name: 'WiFi-2.4-1R82',
      signal_dB: -40
    },
    {
      name: 'telenet-32FE1',
      signal_dB: -50
    },
    {
      name: 'TelenetWiFree',
      signal_dB: -60
    },
    {
      name: 'telenet-55ST2',
      signal_dB: -70
    },
    {
      name: 'TELENETHOMESPOT',
      signal_dB: -80
    }
  ]

}

@Component({
  templateUrl: './dialog-overview-wifi.html',
  styleUrls: ['./wifi.component.scss']
})
export class DialogContentWifi {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private setupService: SetupControllerService) {

  }

  connectedToWifi(){
    this.setupService.setCompletedWifi(true);
    console.log('hello')
  }
 }

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


export interface Section {
  name: string;
  signal_dB: number;
}
