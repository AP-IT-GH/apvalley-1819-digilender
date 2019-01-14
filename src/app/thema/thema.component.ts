import { Component, EventEmitter, Input, Output, OnInit  } from '@angular/core';
import { SetupControllerService } from '../setup-controller.service';

@Component({
  selector: 'app-thema',
  templateUrl: './thema.component.html',
  styleUrls: ['./thema.component.scss']
})
export class ThemaComponent  {

  public currentTheme: string = 'default';
 
  constructor(private setupService: SetupControllerService) { }

  changeThemeDefault(){
    this.setupService.changeTheme(false);
    this.currentTheme="default";
  }

  changeThemeOther(){
    this.setupService.changeTheme(true);
    this.currentTheme="scandinavian";
  }

  changeThemeLente(){
    //this.setupService.changeTheme(true);
    this.currentTheme="lente";
  }

}
