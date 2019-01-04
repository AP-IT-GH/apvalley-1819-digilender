import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service'



@Component({
  selector: 'app-locatie',
  templateUrl: './locatie.component.html',
  styleUrls: ['./locatie.component.scss']
})
export class LocatieComponent implements OnInit {


  message: string;

  constructor(private data: LocationService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  changeCity(newCity: string) {
    if (newCity){
      this.data.changeMessage(newCity)
    }
  }

}
