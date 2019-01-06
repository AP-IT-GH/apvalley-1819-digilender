import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service'
import { SetupControllerService } from '../setup-controller.service';

@Component({
  selector: 'app-locatie',
  templateUrl: './locatie.component.html',
  styleUrls: ['./locatie.component.scss']
})
export class LocatieComponent implements OnInit {

  message: string;

  constructor(private data: LocationService, private setupService: SetupControllerService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  changeCity(newCity: string) {
    if (newCity){
      this.data.changeMessage(newCity);
      this.setupService.setCompletedLocation(true);
    }
  }

}
