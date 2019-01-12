import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { LocationService } from '../location.service'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  today: number = Date.now();
  condition: string;
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  darkMode: boolean;

  constructor(public weather: WeatherService, private data: LocationService) { }

  city: string;

  receveMessage($event) {
    this.city = $event;
  }

  ngOnInit() {

    this.data.currentMessage.subscribe(message => {
      this.city = message
      
      this.weather.getWeatherState(this.city).subscribe((data: string) => {
        this.condition = data;
      });/*
      this.weather.getMinTemp(city).subscribe((data: number) => {
        this.minTemp = data;
      });
      this.weather.getMaxTemp(city).subscribe((data: number) => {
        this.maxTemp = data;
      });*/
      this.weather.getCurrentTemp(this.city).subscribe((data: number) => {
        this.currentTemp = data;
        console.log(this.currentTemp);
      });
    })
    //this.city = 'Los Ángeles, California, EE. UU.';


  }

}
