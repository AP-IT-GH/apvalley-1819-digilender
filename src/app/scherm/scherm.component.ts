import { Component, OnInit } from '@angular/core';
import { SetupControllerService } from '../setup-controller.service';


@Component({
  selector: 'app-scherm',
  templateUrl: './scherm.component.html',
  styleUrls: ['./scherm.component.scss']
})
export class SchermComponent implements OnInit {

  constructor(private setupService: SetupControllerService) { }

  ngOnInit() {
   
   }

  // valueBrightness = 100;
  valueBrightness = 100;

  valueSleepmode = 100;


  onChangeBrightness($event) {
    let value = $event
    this.setupService.setBrightness(value)
    //console.log(value)
  }
  onChangeSleepmode($event) {
    let value = $event
    //console.log(value)
  }

}
