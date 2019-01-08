import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WifiService } from '../wifi.service';
import { from } from 'rxjs';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})

export class WifiComponent implements OnInit {
  networks;
  selWifi;
  pass: string;
  loaded: boolean;
  constructor( private router: Router, private route: ActivatedRoute, public wservice: WifiService, private cd: ChangeDetectorRef, public mService: ModalService) {
    this.loaded = false
  }

  ngOnInit() {
    this.networks = this.wservice.getNetworks();
    console.log(this.networks);
    this.loaded = true;
    /*  from(this.wservice.getNetworks())
    .subscribe(networks => {
      console.log(this.networks);
      this.networks = networks;
      console.log(this.networks);
      this.loaded = true;
      console.log("loaded");
      console.log(this.loaded);
    });*/
  }

  selectClick(network){
    network.selected = true;
    console.log("selectClick");
    console.log(arguments);
    this.selWifi = network;
    this.mService.open("wifi-detail");
  }


  connect(){
    console.log("connectClick");
    this.selWifi.pass = this.pass;
    this.wservice.connect(this.selWifi);
    this.selWifi = undefined;
    this.pass = undefined;
    this.mService.close("wifi-detail");
  }

  cancel(){
    this.selWifi = undefined;
    this.pass = undefined;
    this.mService.close("wifi-detail");
  }
}

