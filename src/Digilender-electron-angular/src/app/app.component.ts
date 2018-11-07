import {Component, OnDestroy, OnInit} from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

 // var apiKey = 'a54b87c5a39fed1429dcbda86a35318f';
  
export class AppComponent implements OnInit {
  title = 'Digilender-electron-angular';

  condition: string;
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  darkMode: boolean;

 
  constructor(public weather: WeatherService){}
              

  ngOnInit() {
    
    var city = 'Antwerp';
    
     this.weather.getWeatherState(city).subscribe((data: string) => {
        this.condition = data;
      });
    this.weather.getMinTemp(city).subscribe((data: number) => {
      this.minTemp = data;
    });
    this.weather.getMaxTemp(city).subscribe((data: number) => {
      this.maxTemp = data;
    });  
    this.weather.getCurrentTemp(city).subscribe((data: number) => {
      this.currentTemp = data;
      console.log(this.currentTemp);
    });
    
  }
}
 
