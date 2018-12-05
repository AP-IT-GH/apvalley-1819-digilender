import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  condition: string;
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  darkMode: boolean;

  constructor(public weather: WeatherService) { }


  ngOnInit() {

    var city = 'Antwerp';

    this.weather.getWeatherState(city).subscribe((data: string) => {
      this.condition = data;
    });/*
    this.weather.getMinTemp(city).subscribe((data: number) => {
      this.minTemp = data;
    });
    this.weather.getMaxTemp(city).subscribe((data: number) => {
      this.maxTemp = data;
    });*/
    this.weather.getCurrentTemp(city).subscribe((data: number) => {
      this.currentTemp = data;
      console.log(this.currentTemp);
    });

  }

}
