import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WifiService } from '../wifi.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})

export class WifiComponent implements OnInit {
  networksObs;
  networks;
  selectedName: string;
  passwd: string;
  loaded: boolean;
  constructor( private router: Router, private route: ActivatedRoute, public wservice: WifiService) {
    this.loaded = false;
  }

  ngOnInit() {
    this.networksObs = from(this.wservice.getNetworks())
    .subscribe(networks => {
      console.log(this.networks);
      this.networks = networks;
      console.log(this.networks);
      this.loaded = true;
      console.log("loaded");
      console.log(this.loaded);
    });
  }

  selectClick(network){
    network.selected = true;
    console.log("selectClick");
    console.log(arguments);
  }

  connect(network){
    console.log("connectClick");
    console.log(arguments);
  }
}

