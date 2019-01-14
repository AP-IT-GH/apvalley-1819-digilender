import { WifiService } from '../wifi.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SetupControllerService } from "../setup-controller.service";

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent {
    
  networks;
    
  constructor(public dialog: MatDialog, public wService: WifiService ) { 
      this.wService.updateNetworks().then(networks => {
        this.networks = [...networks];
      });
  }

  ngOnInit() {
    console.log(this.networks);
  }
  
  openDialog(network) {
    this.dialog.open(DialogContentWifi, {
      data: { 
        ssid: network.ssid,
        quality: network.quality
      }
    });
  }
}

@Component({
  templateUrl: './dialog-overview-wifi.html',
  styleUrls: ['./wifi.component.scss']
})
export class DialogContentWifi {
  pass;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private setupService: SetupControllerService, public dialogRef: MatDialogRef<DialogContentWifi>, public wService: WifiService) {
  }

  connect(){
    this.wService.connect(this.data.ssid, this.pass);
    this.setupService.setCompletedWifi(true);
    this.dialogRef.close();
  }
}

