import { Component, EventEmitter, Input, Output, OnInit  } from '@angular/core';
import { SetupControllerService } from '../setup-controller.service';

@Component({
  selector: 'app-thema',
  templateUrl: './thema.component.html',
  styleUrls: ['./thema.component.scss']
})
export class ThemaComponent  {

 
  constructor(private setupService: SetupControllerService) { }

  changeThemeDefault(){
    this.setupService.changeTheme(false);
  }

  changeThemeOther(){
    this.setupService.changeTheme(true);
  }

}
