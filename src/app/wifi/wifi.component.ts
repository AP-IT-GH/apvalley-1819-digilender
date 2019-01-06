import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {
  networks;
  selectedName: string;
  passwd: string;

  constructor( private router: Router, private route: ActivatedRoute) {
  this.networks = [{
      name: "net A", strength: 1, selected: false}, {
      name: "net B", strength: 2, selected: false}, {
      name: "net A", strength: 3, selected: false}, {
      name: "net A", strength: 1, selected: false}, {
      name: "net A", strength: 2, selected: false}, {
      name: "net A", strength: 3, selected: false}, {
      name: "net B", strength: 1, selected: false}, {
      name: "net B", strength: 2, selected: false}, {
      name: "net A", strength: 3, selected: false}, {
      name: "net A", strength: 3, selected: false}, {
      name: "net A", strength: 3, selected: false}, {
      name: "net A", strength: 3, selected: false}, {
      name: "net B", strength: 1, selected: false}, {
      name: "net B", strength: 1, selected: false}, {
      name: "net B", strength: 1, selected: false}, {
      name: "net B", strength: 1, selected: false}, {
      name: "net B", strength: 3, selected: false}, {
      name: "net B", strength: 1, selected: false}];
  }

  ngOnInit() {
  }

  selectClick(network: Inetwork){
    network.selected = true;
    console.log("selectClick");
    console.log(arguments);
  }

  connect(network: Inetwork){
    console.log("connectClick");
    console.log(arguments);
  }
}

export interface Inetwork {
  name: string;
  strength: number;
  selected: boolean;
}
